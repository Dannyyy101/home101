import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
    url: "http://87.106.207.129/auth",
    realm: "101",
    clientId: "home"
});
