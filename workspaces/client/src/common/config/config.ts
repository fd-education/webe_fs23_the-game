import {Stage} from '@the-game/common/dist/enum/preferences/stage.enum';

type Config = {
    stage: Stage;
    port: number;
    backendUrl: string;
};

const validateConfig = (): Config => {
    if (!process.env.REACT_APP_STAGE) {
        throw new Error('REACT_APP_STAGE is not defined');
    }

    if (!process.env.REACT_APP_PORT) {
        throw new Error('REACT_APP_PORT is not defined');
    }

    switch (process.env.REACT_APP_STAGE) {
        case Stage.DEV:
            return {
                stage: Stage.DEV,
                port: parseInt(process.env.REACT_APP_PORT),
                backendUrl: 'http://localhost:9000'
            };
        case Stage.PROD:
            return {
                stage: Stage.PROD,
                port: parseInt(process.env.REACT_APP_PORT),
                backendUrl: 'http://localhost:9000'
            };
        case Stage.TEST:
            return {
                stage: Stage.TEST,
                port: parseInt(process.env.REACT_APP_PORT),
                backendUrl: 'http://localhost:9000'
            };
        default:
            throw new Error('REACT_APP_STAGE is not valid');
    }
};

const config = validateConfig();
export {config};
