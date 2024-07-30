
const DataLoading = () => {
    return (
        <div className="animate-pulse space-y-5 w-full h-full">
            <form className="relative lg:w-96 xl:w-[405px]">
                <input
                    type="text" placeholder="Search here..." className="input hover:border hover:border-gray-600 rounded-full w-full" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </form>
            <div className="space-y-10">
                <div className="text-left lg:flex flex-grow space-y-5 shadow rounded-2xl h-80">
                    <div className="flex items-center justify-center bg-gray-200 rounded-t-2xl lg:rounded-l-2xl md:w-[720px] h-full">
                        <svg className="w-48 h-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="w-full space-y-5 lg:p-6 p-8">
                        <div className="w-full space-y-4">
                            <div className="lg:text-base shadow lg:font-medium outline-gray-500 hover:bg-gray-100 hover:text-gray-800 text-gray-600 outline outline-1 rounded-lg w-fit px-3 py-2 md:py-3 md:px-6 normal-case my-4 h-3 bg-gray-200 dark:bg-gray-700">
                            </div>
                            <h2 className="md:text-2xl text-gray-500 hover:text-gray-700 text-xl md:font-semibold h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                            </h2>
                            <h2 className="md:text-lg font-medium text-gray-700 my-2 h-3 bg-gray-200 rounded-full dark:bg-gray-700 ">
                            </h2>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <svg className="w-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg></div>
                                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-3 items-center gap-5">
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-10">
                <div className="text-left lg:flex flex-grow space-y-5 shadow rounded-2xl h-80">
                    <div className="flex items-center justify-center bg-gray-200 rounded-t-2xl lg:rounded-l-2xl md:w-[720px] h-full">
                        <svg className="w-48 h-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="w-full space-y-5 lg:p-6 p-8">
                        <div className="w-full space-y-4">
                            <div className="lg:text-base shadow lg:font-medium outline-gray-500 hover:bg-gray-100 hover:text-gray-800 text-gray-600 outline outline-1 rounded-lg w-fit px-3 py-1 md:py-3 md:px-6 normal-case my-4 h-3 bg-gray-200 dark:bg-gray-700">
                            </div>
                            <h2 className="md:text-2xl text-gray-500 hover:text-gray-700 text-xl md:font-semibold h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                            </h2>
                            <h2 className="md:text-lg font-medium text-gray-700 my-2 h-3 bg-gray-200 rounded-full dark:bg-gray-700 ">
                            </h2>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <svg className="w-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg></div>
                                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-3 items-center gap-5">
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataLoading;