const newsUrl =
    "https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=50&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time";

const getDataFromURL = async (url) => {
    const result = await fetch(url);
    const data = await result.json();
    return data;
};

getDataFromURL(newsUrl).then((result) => {
    const buttonMore = document.querySelector(".button-more");
    const news = document.querySelector(".news");
    const data = result.data[1004765].data;

    let stepNews = 10;
    let idNews = 0;

    const addNews = (data) => {
        data.forEach((item) => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("p-4", "md:w-full", 'lg:w-1/2');
            newsItem.innerHTML = `
            <div
                class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden flex flex-col shadow-indigo-100 shadow-md">
                <div class="overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center transition-all duration-400 hover:scale-110"
                        src="${item.thumbnail_url}"
                        alt="blog">
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h2 class="text-xs title-font font-medium text-gray-400 mb-1">
                        Theo VnExpress</h2>
                    <h1 class="title-font text-lg font-bold text-gray-600 mb-3">${item.title}</h1>
                    <p class="leading-relaxed mb-3">${item.lead}</p>
                    <div class="flex items-center flex-wrap mt-auto">
                        <a href="${item.share_url}"
                            class="bg-gradient-to-r from-gray-200 to-gray-300 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg">Đọc thêm</a>
                    </div>
                </div>
            </div>
        `;
            news.appendChild(newsItem);
        });
    };

    addNews(data.slice(idNews++ * stepNews, stepNews));

    buttonMore.addEventListener("click", () => {
        if(idNews * stepNews >= data.length) {
            console.log('nothing anymore')
            return;
        }
        addNews(data.slice(idNews * stepNews, idNews++ * stepNews + stepNews));
    });

});
