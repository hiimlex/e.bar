import { ptBr } from "../i18n/translations/pt-br";


export type NamespaceKeys = keyof typeof ptBr; // 'AttendanceStatus'
export type TranslationKeys<N extends NamespaceKeys> = keyof typeof ptBr[N]; 