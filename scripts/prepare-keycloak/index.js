const KcAdminClient = require('@keycloak/keycloak-admin-client');
const prompt = require("prompt");
const fs = require("fs");

const confFile = fs.readFileSync(`${__dirname}/config.json`);
const confJSON = JSON.parse(confFile);

const REALM = confJSON.realmName;

const WEB_UI_REDIRECT_URI = 'http://localhost:3000/';

const kcAdminClient = new KcAdminClient.default();
kcAdminClient.auth({
    username: confJSON.adminUsername,
    password: confJSON.adminPw,
    grantType: 'password',
    clientId: 'admin-cli'
}).then(() => {
    console.log('Authenticated with admin user...');

    console.log('Check if realm "app" is existing...');

    kcAdminClient.realms.find().then((realms) => {
        const found = realms.filter(r => r.realm.toLowerCase() === 'app');
        if (found.length >= 1) {
            console.log('Realm "app" already exists! Nothing todo here.');

            prompt.start();
            prompt.get({
                properties: {
                    reInit: {
                        description: "Do you want a re-init? (yes/no)"
                    }
                }
            }, (err, res) => {
                if (res.reInit.toLocaleLowerCase() === 'yes') {
                    kcAdminClient.realms.del({
                        realm: REALM,
                    }).then(() => init())
                } else {
                    console.log('OK, bye bye!');
                }
            })

            return;
        }

        init();
    }).catch(() => console.log('Could not read realms...'));;
}).catch(console.log);

function createClient(client) {
    console.log(`Creating client "${client.clientId}"`);

    return kcAdminClient.clients.create({
        realm: REALM,
        protocol: 'openid-connect',
        ...client,
    }).then(r => {
        console.log(`Created client "${client.clientId}", ${JSON.stringify(r)}`);
        return r;
    });
}

function addRoleToUser(roleList, user) {
    console.log(`Assign roles ${roleList} to user ${user.id}`);

    const promises = [];
    for (let roleName of roleList) {
        const promise = kcAdminClient.roles.findOneByName({
            realm: REALM,
            name: roleName
        }).then(r => {
            return kcAdminClient.users.addRealmRoleMappings({
                realm: REALM,
                id: user.id,
                roles: [r]
            });
        }).then(() => {
            console.log(`Assigned role "${roleName}" to user ${JSON.stringify(user)}`);
        });

        promises.push(promise);
    }

    return Promise.all(promises);
}

function createUser(user) {
    console.log(`Creating user "${user.email}"`);

    return kcAdminClient.users.create({
        realm: REALM,
        username: user.email,
        email: user.email,
        enabled: true,
        credentials: [{
            temporary: false,
            value: user.password
        }],
    }).then((r) => {
        console.log(`Created user "${user.email}", ${JSON.stringify(r)}`);
        return r;
    });
}

function createRole(role) {
    console.log(`Creating role "${role.name}"`);

    return kcAdminClient.roles.create({
        realm: REALM,
        name: role.name,
        description: role.description
    }).then((r) => {
        console.log(`Created role "${role.name}", ${JSON.stringify(r)}`);
        return r;
    });
}

function init() {
    console.log('Realm "app" does not exist. Will create it.');

    kcAdminClient.realms.create({
        realm: REALM,
        enabled: true,
    }).then(() => {
        console.log(`Successfully created realm "${REALM}"`);

        const promises = [];
        for (let c of confJSON.clients) {
            const promise = createClient(c);
            promises.push(promise);
        }

        return Promise.all(promises);
    }).then((clientAppWebUI) => {
        const promises = [];
        for (let role of confJSON.roles) {
            const promise = createRole(role);
            promises.push(promise);
        }

        return Promise.all(promises);
    }).then(() => {
        const promises = [];
        for (let user of confJSON.users) {
            const promise = createUser(user)
                .then(u => {
                    return addRoleToUser(user.roles, u);
                });
            promises.push(promise);
        }

        return Promise.all(promises);
    }).then(() => {

    }).catch(console.log);
}