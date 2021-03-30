import Keycloak, {KeycloakConfig, KeycloakInstance} from "keycloak-js";
import { User } from "../contexts/user-data-context";

let keycloak: KeycloakInstance;

const KeycloakService = () => {
    const keycloakConf: KeycloakConfig = {
        clientId: 'app-web-ui',
        realm: 'app',
        url: 'http://localhost:8080/auth'
    };

    keycloak = Keycloak(keycloakConf);

    return {
        async init(): Promise<User|null> {
            const isAuthenticated = await keycloak.init({ onLoad: 'login-required' });
            if (isAuthenticated) {
                const keycloakProfile = await keycloak.loadUserProfile();
                return {
                    email: keycloakProfile.email!,
                    username: keycloakProfile.username!,
                    firstname: keycloakProfile.firstName || '',
                    surname: keycloakProfile.lastName || '',
                    roles: keycloak.realmAccess?.roles || []
                };
            }

            return null;
        },
        logout() {
            keycloak.logout();
        }
    }
};

export default KeycloakService;