
chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    // Function: Fetch Elements
    const fetchElements = () => {
        let elements;
        let host = window.location.hostname;
        if (host !== "internal.activepipe.com" && host !== "live.activepipe.com" && host !== "activepipe.com") {
            elements = document.querySelectorAll("body, body *");
        } else {
            elements = document.querySelectorAll("td, td *");
        }
        return Array.from(elements);
    };

    // Function: Fetch blockquotes
    const fetchBlockQuote = () => {
        const htmlCollection = document.getElementsByTagName('blockquote');
        const blockquotes = Array.from(htmlCollection);
        if (blockquotes) {
            blockquotes.map(blockquote => {
                const borderColor = window.getComputedStyle(blockquote, null).getPropertyValue('border-left-color');
                const hexColor = rgbToHex(borderColor);
                createPopups(blockquote, hexColor);
            });
        }
    };

    // Function: Convert RGB to Hex
    const rgbToHex = rgb => {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    };

    // Function: Create Popups
    const createPopups = (element, elementData) => {
        const container = document.createElement('div');
        const content = document.createElement('div');
        const node = document.createTextNode(elementData);
        container.setAttribute('class', 'popup_container');
        content.setAttribute("class", "popup_content");
        content.appendChild(node);
        container.appendChild(content);
        element.insertBefore(element.appendChild(container), element.childNodes[0]);
    };

    // Function: Remove Popups
    const removePopups = () => {
        const htmlCollection = document.querySelectorAll(".popup_container");
        if (htmlCollection) {
            const elements = Array.from(htmlCollection);
            elements.map(element => {
                Array.from(element.childNodes).map(childNode => {
                    childNode.remove();
                });
                element.remove();
            });
        }
    };

    // Function: Show hrefs of anchor tags
    const showLinks = () => {
        removePopups();
        const htmlCollection = document.querySelectorAll('a');
        if (htmlCollection) {
            const anchorTags = Array.from(htmlCollection);
            if (anchorTags) {
                anchorTags.map((anchorTag) => {
                    if (anchorTag.href) {
                        return createPopups(anchorTag, anchorTag.href);
                    }
                });
            }
        }
    };

    // Function: Show Font Sizes
    const showFontSize = () => {
        removePopups();
        const elements = [...fetchElements().filter(fetchedElement => fetchedElement != null)];
        if (elements) {
            elements.map(element => {
                if (element.hasChildNodes() && element.childNodes[0].nodeType === 3) {
                    const fontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
                    if (fontSize) {
                        return createPopups(element, fontSize)
                    }
                }
            });
        }
    };

    // Function: Show Font Families
    const showFontFam = () => {
        removePopups();
        const elements = [...fetchElements().filter(fetchedElement => fetchedElement != null)];
        if (elements) {
            elements.map(element => {
                if (element.hasChildNodes() && element.childNodes[0].nodeType === 3) {
                    const fontFamily = window.getComputedStyle(element, null).getPropertyValue('font-family');
                    if (fontFamily) {
                        return createPopups(element, fontFamily)
                    }
                }
            });
        }
    };

    // Function: Show Font Colors
    const showFontColor = () => {
        removePopups();
        const elements = [...fetchElements().filter(fetchedElement => fetchedElement != null)];
        if (elements) {
            elements.map(element => {
                if (element.hasChildNodes() && element.childNodes[0].nodeType === 3) {
                    const fontColor = window.getComputedStyle(element, null).getPropertyValue('color');
                    if (fontColor) {
                        const hexColor = rgbToHex(fontColor);
                        if (element) {
                            return createPopups(element, hexColor);
                        }
                    }
                }
            });
        }
    };

    // Function: Show Background Colors
    const showBGColor = () => {
        removePopups();
        const elements = [...fetchElements().filter(fetchedElement => fetchedElement != null)];
        if (elements) {
            elements.map(element => {
                const bgColor = window.getComputedStyle(element, null).getPropertyValue('background-color');
                if (bgColor) {
                    const hexColor = rgbToHex(bgColor);
                    if (hexColor != '#000000') {
                        return createPopups(element, hexColor);
                    }
                }
            });
        }
        fetchBlockQuote();
    };

    // Function: Show Image Intrinsic Sizes
    const showImageSizes = () => {
        removePopups();
        const htmlCollection = document.getElementsByTagName('img');
        if (htmlCollection) {
            const images = Array.from(htmlCollection);
            if (images) {
                images.map(image => {
                    return createPopups(image.parentElement, `w: ${image.naturalWidth} x h: ${image.naturalHeight}`);
                });
            }
        }
    };

    switch (request.todo) {

        case 'showLinks': return showLinks();
        case 'showFontSize': return showFontSize();
        case 'showFontFam': return showFontFam();
        case 'showFontColor': return showFontColor();
        case 'showBGColor': return showBGColor();
        case 'showImageSizes': return showImageSizes();

        case 'clearAll': return removePopups();

        default: return console.log('default switch');
    }
});