function GalleryView(params) {
    var _self = null;
    var _thumbnailScrollView = null;
    var _adViewClass = null;
    var _adView = null;
    var _popup = null;
    var _params = null;
    var _numCols = 0;
    var _borderPadding = 0;
    var _thumbSize = 0;
    var _dpifactor = 0;
    _params = "undefined" == typeof params ? {} : params;
    _params.title = "undefined" == typeof _params.title ? "Gallery" : _params.title;
    _params.images = "undefined" == typeof _params.images ? [] : _params.images;
    _params.images = "undefined" == typeof _params.images ? [] : _params.images;
    _params.numCols = "undefined" == typeof _params.numCols ? 4 : _params._numCols;
    _params.numColsPortrait = "undefined" == typeof _params.numColsPortrait ? _params.numCols : _params.numColsPortrait;
    _params.numColsLandscape = "undefined" == typeof _params.numColsLandscape ? _params.numCols : _params.numColsLandscape;
    _params.borderPadding = "undefined" == typeof _params.borderPadding ? 4 : _params.borderPadding;
    _params.borderColor = "undefined" == typeof _params.borderColor ? "#fff" : _params.borderColor;
    _params.borderWidth = "undefined" == typeof _params.borderWidth ? 1 : _params.borderWidth;
    _params.backgroundColor = "undefined" == typeof _params.backgroundColor ? "#000" : _params.backgroundColor;
    _params.textColor = "undefined" == typeof _params.textColor ? "#fff" : _params.textColor;
    _params.barColor = "undefined" == typeof _params.barColor ? "#000" : _params.barColor;
    _adViewClass = "undefined" == typeof params.adViewClass ? null : params.adViewClass;
    _adViewClass && (_adView = new _adViewClass({
        bottom: 0
    }));
    _dpifactor = TU.Device.getDpi() / 160;
    var _self = Ti.UI.createView({
        backgroundColor: _params.backgroundColor
    });
    var recomputeSizes = function() {
        computeSizes();
        var currCol = 0;
        var currRow = 0;
        var yPos = _borderPadding;
        var xPos = _borderPadding;
        for (var i = 0, b = _thumbnailScrollView.children.length; b > i; i++) {
            if (0 === currCol % _numCols && currCol > 0) {
                xPos = _borderPadding;
                yPos += _borderPadding + _thumbSize;
                currRow++;
            }
            var currentThumb = _thumbnailScrollView.children[i];
            var iv_w = 0;
            var iv_h = 0;
            var img = _params.images[i];
            var imgr = img.renditions[0];
            var img_w = parseInt(imgr.width);
            var img_h = parseInt(imgr.height);
            if (img_w > img_h) {
                iv_w = _thumbSize - 6 * _dpifactor;
                iv_h = parseInt(_thumbSize * img_h / img_w - 6 * _dpifactor);
            } else {
                iv_h = _thumbSize - 6 * _dpifactor;
                iv_w = parseInt(_thumbSize * img_w / img_h - 6 * _dpifactor);
            }
            currentThumb.width = _thumbSize;
            currentThumb.height = _thumbSize;
            currentThumb.left = xPos;
            currentThumb.top = yPos;
            currentThumb.children[0].width = iv_w;
            currentThumb.children[0].height = iv_h;
            currentThumb.children[0].top = parseInt((_thumbSize - iv_h) / 2);
            currentThumb.children[0].left = parseInt((_thumbSize - iv_w) / 2);
            currCol++;
            xPos += _thumbSize + _borderPadding;
        }
    };
    var computeSizes = function() {
        _numCols = _params.numCols;
        _numCols = TU.Device.getDisplayWidth() > TU.Device.getDisplayHeight() ? _params.numColsLandscape : _params.numColsPortrait;
        _borderPadding = _params.borderPadding;
        _thumbSize = (TU.Device.getDisplayWidth() - (_numCols + 1) * _borderPadding) / _numCols;
    };
    var createThumbGallery = function() {
        _thumbnailScrollView = Ti.UI.createScrollView({
            top: 0,
            bottom: null == _adView ? 0 : _adView.getHeight(),
            contentWidth: "100%",
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: false,
            backgroundColor: _params.backgroundColor
        });
        computeSizes();
        var currCol = 0;
        var currRow = 0;
        var yPos = _borderPadding;
        var xPos = _borderPadding;
        for (var i = 0, b = _params.images.length; b > i; i++) {
            if (0 === currCol % _numCols && currCol > 0) {
                xPos = _borderPadding;
                yPos += _borderPadding + _thumbSize;
                currRow++;
            }
            var thumbImageBorder = Ti.UI.createView({
                width: _thumbSize,
                height: _thumbSize,
                imageId: i,
                left: xPos,
                top: yPos,
                backgroundColor: _params.backgroundColor,
                borderWidth: _params.borderWidth,
                borderColor: _params.borderColor
            });
            var img = _params.images[i];
            var imgr = img.renditions[0];
            var thumbPath = imgr.url;
            var iv_w = 0;
            var iv_h = 0;
            var img_w = parseInt(imgr.width);
            var img_h = parseInt(imgr.height);
            if (img_w > img_h) {
                iv_w = _thumbSize - 6 * _dpifactor;
                iv_h = parseInt(_thumbSize * img_h / img_w - 6 * _dpifactor);
            } else {
                iv_h = _thumbSize - 6 * _dpifactor;
                iv_w = parseInt(_thumbSize * img_w / img_h - 6 * _dpifactor);
            }
            var thumbImage = Ti.UI.createImageView({
                image: thumbPath,
                imageId: i,
                width: iv_w,
                height: iv_h,
                top: parseInt((_thumbSize - iv_h) / 2),
                left: parseInt((_thumbSize - iv_w) / 2)
            });
            thumbImageBorder.add(thumbImage);
            thumbImageBorder.addEventListener("click", function(e) {
                _popup = new GalleryViewPopup(_params.images, e.source.imageId, _adViewClass);
                _popup.barColor = _params.barColor;
                TU.UI.TGWM.openWindow(_popup);
            });
            _thumbnailScrollView.add(thumbImageBorder);
            currCol++;
            xPos += _thumbSize + _borderPadding;
        }
        _self.add(_thumbnailScrollView);
        null != _adView && _self.add(_adView);
    };
    createThumbGallery();
    Ti.Gesture.addEventListener("orientationchange", recomputeSizes);
    _self.addEventListener("close", function() {
        Ti.Gesture.removeEventListener("orientationchange", recomputeSizes);
    });
    return _self;
}

var TU = require("/TitanUp/TitanUp");

var GalleryViewPopup = function(images, startIndex, adViewClass) {
    var _self = null;
    var _scrollableGalleryView = null;
    var _captionView = null;
    var _captionOverlay = null;
    var _captionLabel = null;
    var _adView = null;
    var _isUiHidden = false;
    null != adViewClass && (_adView = new adViewClass({
        bottom: 0
    }));
    var wparams = {
        backgroundColor: "#000",
        title: startIndex + 1 + " of " + images.length,
        translucent: true
    };
    if ("android" == TU.Device.getOS()) {
        wparams.fullscreen = true;
        wparams.navBarHidden = true;
    }
    _self = Ti.UI.createWindow(wparams);
    _scrollableGalleryView = Ti.UI.createScrollableView({
        top: 0,
        bottom: 0,
        views: [],
        showPagingControl: false,
        maxZoomScale: 2,
        currentPage: startIndex
    });
    var m = TU.UI.Sizer.getDimension(4);
    var fs = TU.UI.Sizer.getDimension(18);
    var caption = "undefined" != typeof images[startIndex].headline ? images[startIndex].headline : "";
    _captionView = Ti.UI.createView({
        left: m,
        right: m,
        bottom: null == _adView ? m : m + _adView.getHeight(),
        height: parseInt(3.5 * fs)
    });
    _captionOverlay = Ti.UI.createView({
        left: 0,
        right: 0,
        height: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .5
    });
    _captionLabel = Ti.UI.createLabel({
        text: caption,
        top: m,
        left: m,
        right: m,
        bottom: m,
        color: "#fff",
        font: {
            fontSize: fs,
            fontWeight: "bold"
        },
        textAlign: "center",
        ellipsize: true,
        zIndex: 2
    });
    _captionView.add(_captionOverlay);
    _captionView.add(_captionLabel);
    var reComputeImageSize = function(width, height) {
        var newWidth = width, newHeight = height;
        var pw = TU.Device.getDisplayWidth();
        var ph = TU.Device.getDisplayHeight();
        if (width / pw >= height / ph) {
            if (width > pw) {
                newHeight = height * pw / width;
                newWidth = pw;
            } else if (height > ph) {
                newWidth = width * ph / height;
                newHeight = ph;
            }
        } else if (height > ph) {
            newWidth = width * ph / height;
            newHeight = ph;
        } else if (width > pw) {
            newHeight = height * pw / width;
            newWidth = pw;
        }
        return {
            width: newWidth,
            height: newHeight
        };
    };
    var reComputeImageSizeOnChange = function(index) {
        newSize = reComputeImageSize(images[index].renditions[1].width, images[index].renditions[1].height);
        _scrollableGalleryView.views[index].height = newSize.height;
        _scrollableGalleryView.views[index].width = newSize.width;
    };
    var toggleUI = function() {
        if (_isUiHidden) {
            "android" != TU.Device.getOS() && _self.showNavBar();
            var animation1 = Titanium.UI.createAnimation();
            animation1.duration = 300;
            animation1.opacity = 1;
            var animation2 = Titanium.UI.createAnimation();
            animation2.duration = 300;
            animation2.opacity = .5;
            _captionView.animate(animation1);
            _captionOverlay.animate(animation2);
        } else {
            "android" != TU.Device.getOS() && _self.hideNavBar();
            var animation1 = Titanium.UI.createAnimation();
            animation1.duration = 300;
            animation1.opacity = 0;
            var animation2 = Titanium.UI.createAnimation();
            animation2.duration = 300;
            animation2.opacity = 0;
            _captionView.animate(animation1);
            _captionOverlay.animate(animation2);
        }
        _isUiHidden = !_isUiHidden;
    };
    var imageViews = [];
    if ("android" == TU.Device.getOS()) {
        for (var i = 0, b = images.length; b > i; i++) {
            var view = Ti.UI.createImageView({
                backgroundColor: "#000",
                image: images[i].renditions[1].url
            });
            imageViews[i] = view;
            view.addEventListener("singletap", toggleUI);
        }
        _scrollableGalleryView.views = imageViews;
        _scrollableGalleryView.currentPage = startIndex;
        _self.add(_scrollableGalleryView);
        _adView && _self.add(_adView);
    } else {
        for (var i = 0, b = images.length; b > i; i++) {
            var view = Ti.UI.createImageView({
                backgroundColor: "#000",
                image: images[i].renditions[1].url,
                height: "auto",
                width: "auto",
                index: i,
                firstLoad: true
            });
            view.addEventListener("load", function(e) {
                e.source.firstLoad && reComputeImageSizeOnChange(e.source.index);
                e.source.firstLoad = false;
            });
            view.addEventListener("singletap", toggleUI);
            imageViews[i] = view;
        }
        _scrollableGalleryView.views = imageViews;
        _self.add(_scrollableGalleryView);
    }
    _self.add(_captionView);
    null !== _adView && _self.add(_adView);
    _scrollableGalleryView.addEventListener("scroll", function(e) {
        var pnum = e.currentPage + 1;
        _self.title = pnum + " of " + images.length;
        ("undefined" == typeof images[e.currentPage].headline || "undefined" == images[e.currentPage].headline) && (images[e.currentPage].headline = "");
        null != _captionLabel && (_captionLabel.text = images[e.currentPage].headline);
    });
    return _self;
};

GalleryView.TUInit = function(tu) {
    TU = tu;
};

module.exports = GalleryView;