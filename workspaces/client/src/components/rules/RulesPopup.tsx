import {useTranslation} from 'react-i18next';

interface RulesPopupProps {
    onClose: () => void;
}

export const RulesPopup = (props: RulesPopupProps) => {
    const {t} = useTranslation();

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-secondaryLightOpaque dark:bg-secondaryDarkOpaque">
            <button
                className="absolute top-5 right-5 w-8 h-8 bg-secondaryLight dark:bg-secondaryDark z-100 rounded-md font-bold text-black dark:text-white"
                onClick={() => props.onClose()}
            >
                X
            </button>
            <div className="carousel w-[80%] h-[80%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 bg-primaryLight dark:bg-secondaryDark rounded-2lg">
                <div
                    id="slide1"
                    className="carousel-item relative w-full h-full"
                >
                    <div className="flex flex-row justify-center items-center w-full h-full space-x-10">
                        <div className="w-[40%] space-y-5">
                            <h1 className="text-center font-bold text-black dark:text-white">
                                {t('rules.generalTitle')}
                            </h1>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.general1')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.general2')}
                            </p>
                        </div>
                        <img className="h-2/3" src="/image/intro.png" />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide2"
                    className="carousel-item relative w-full h-full"
                >
                    <div className="flex flex-row justify-center items-center w-full h-full space-x-10">
                        <div className="w-1/3 space-y-5">
                            <h1 className="text-center  font-bold text-black dark:text-white">
                                {t('rules.communicationTitle')}
                            </h1>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.communication1')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.communication2')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.communication3')}
                            </p>
                        </div>
                        <img
                            className="w-1/2"
                            src="/image/communications.png"
                        />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide3"
                    className="carousel-item relative w-full h-full"
                >
                    <div className="flex flex-row justify-center items-center w-full h-full space-x-10">
                        <div className="w-[40%] space-y-5">
                            <h1 className="text-center font-bold text-black dark:text-white">
                                {t('rules.saveTitle')}
                            </h1>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.save1')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.save2')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.save3')}
                            </p>
                        </div>
                        <img
                            className="h-2/3"
                            src="/image/backward_trick.png"
                        />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide4" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide4"
                    className="carousel-item relative w-full h-full"
                >
                    {' '}
                    <div className="flex flex-row justify-center items-center w-full h-full space-x-10">
                        <div className="w-[40%] space-y-5">
                            <h1 className="text-center font-bold text-black dark:text-white">
                                {t('rules.onfireTitle')}
                            </h1>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.onfire1')}
                            </p>
                            <p className="text-center text-black dark:text-white">
                                {t('rules.onfire2')}
                            </p>
                        </div>
                        <img className="h-2/3" src="/image/onfire.png" />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
