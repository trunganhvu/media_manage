var arrayImgFile = [];
async function getListImg(pathInput) {
    let index = 1;
    await fetch(pathInput)
    .then((res) => res.text())
    .then((text) => {
        index++;
        for (let s of text.split('\r\n')) {
            arrayImgFile.push(s);
        }
    })
    // .catch((e) => console.error(e));
}

function getFileName(text) {
    return text.split('/')[text.split('/').length - 1];
}

function getExtensionFile(text) {
    return text.split('.')[text.split('.').length - 1].toUpperCase();
}
var arrayFileVideo = ["MP4", "MPEG-4","DivX","HEVC","AVI","MOV","FLV","WMV"]
async function loadHtml(pathInput) {
    await getListImg(pathInput);
    let index = 0;
    let html = ''
    for await (let text of arrayImgFile) {
        index++;
        // Video
        if (arrayFileVideo.includes(getExtensionFile(text))) {
            html += '<div class="item">' +
                '<video width="320" height="240" controls>' +
                    '<source src="' + text + '" type="video/' + getExtensionFile(text) +'">' +
                    'Định dạng không hỗ trợ</video><br>' +
                '<a href="' + text + '"download="' + getFileName(text) +'" class="button-download">' +
                    '<img class="item-icon" src="/icon/download.webp" alt="">' +
                '</a>' +
            '</div>';
        // Image
        } else {
            html += '<div class="item">' + 
                '<img class="item-image lazy-load" src="' + text +'" alt="' + index + '"><br>' +
                '<a href="' + text + '" download="' + getFileName(text) +'" class="button-download">' +
                    '<img class="item-icon" src="/icon/download.webp" alt="icon">' +
                '</a>' +
            '</div>';
        }
    }
    document.getElementById('container').innerHTML = html;
}


  
function preload_image(img) {
    img.src = img.dataset.src;
    console.log(`Loading ${img.src}`);
}
const config_opts = {
    rootMargin: '200px 200px 200px 200px'
};
let observer = new IntersectionObserver(function(entries, self) {
    for(entry of entries) { 
    if(entry.isIntersecting) {
        let elem = entry.target;
        preload_image(elem);   
        self.unobserve(elem);
    }
    }
}, config_opts);