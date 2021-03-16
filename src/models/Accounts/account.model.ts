import { ClientModel } from "../Identities/client.model";

export interface AccountModel {
    id: string;
    name: string;
    displayName: string;
    client: ClientModel;
}