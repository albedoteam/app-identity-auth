import { ThemeModel } from "./theme.model";

export interface ClientModel {
    id: string;
    name: string;
    displayName: string;
    theme: ThemeModel;
}