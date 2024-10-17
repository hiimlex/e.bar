import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {ptBr} from "./translations/pt-br";

i18next.use(initReactI18next).init({
	lng: 'pt-BR',
    resources: {
      'pt-BR': {
        translation: ptBr,
      },
    },
    compatibilityJSON: 'v3',
});
