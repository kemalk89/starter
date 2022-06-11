const KcAdminClient = require('@keycloak/keycloak-admin-client');
const prompt = require("prompt");

const REALM = 'app';

const WEB_UI_REDIRECT_URI = 'http://localhost:3000/';

const kcAdminClient = new KcAdminClient.default();
kcAdminClient.auth({
    username: 'admin',
    password: 'admin',
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
    //skcAdminClient.users.find().then(console.log);
}).catch(console.log);

function createClient(clientId, options) {
    console.log(`Creating client "${clientId}"`);
    return kcAdminClient.clients.create({
        realm: REALM,
        clientId,
        protocol: 'openid-connect',
        ...options
    }).then(r => {
        console.log(`Created client "${clientId}", ${JSON.stringify(r)}`);
        return r;
    });
}

function addRoleToUser(role, user) {
    console.log(`Assign role ${role.roleName} to user ${user.id}`);

    return kcAdminClient.roles.findOneByName({
        realm: REALM,
        name: role.roleName
    }).then(r => {
        return kcAdminClient.users.addRealmRoleMappings({
            realm: REALM,
            id: user.id,
            roles: [r]
        });
    }).then(r => {
        console.log(`Assigned role to user, ${r}`);
        return r;
    });
}

function createUser(email) {
    console.log(`Creating user "${email}"`);
    return kcAdminClient.users.create({
        realm: REALM,
        username: email,
        email: email,
        enabled: true,
        credentials: [{
            temporary: false,
            value: '123456'
        }],
    }).then((r) => {
        console.log(`Created user "${email}", ${JSON.stringify(r)}`);
        return r;
    });
}

function createRole(roleName, roleDescription) {
    console.log(`Creating role "${roleName}"`);
    return kcAdminClient.roles.create({
        realm: REALM,
        name: roleName,
        description: roleDescription
    }).then((r) => {
        console.log(`Created role "${roleName}", ${JSON.stringify(r)}`);
        return r;
    });
}

function init() {
    console.log('Realm "app" does not exist. Will create it.');

    kcAdminClient.realms.create({
        realm: 'app',
        enabled: true,
    }).then(() => {
        console.log('Successfully created realm "app"');

        return createClient("app-web-ui", {
            redirectUris: [WEB_UI_REDIRECT_URI],
            rootUrl: WEB_UI_REDIRECT_URI
        });
    }).then((clientAppWebUI) => {
        return Promise.all([
            createRole('USER'),
            createRole('ADMIN'),
        ]);
    }).then(([roleUser, roleAdmin]) => {
        const user1 = createUser('max.mustermann@test.de')
            .then(u => {
                return addRoleToUser(roleUser, u);
            });

        const user2 = createUser('tom.tischler@test.de')
            .then(u => {
                return addRoleToUser(roleAdmin, u);
            });

        return Promise.all([user1, user2]);
    }).then(() => {

    }).catch(console.log);
}