require('../../../src/leaflet/mapping/ImageMapLayer');

var url = GlobeParameter.WorldURL;
describe('leaflet_ImageMapLayer', function () {
    var originalTimeout;
    var testDiv, map, imageLayer;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            center: [0, 0],
            maxZoom: 18,
            zoom: 1
        });
        imageLayer = L.supermap.imageMapLayer(url).addTo(map);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        imageLayer = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', function () {
        var tempOptions = {
            layersID: null,
            redirect: false,
            transparent: null,
            cacheEnabled: null,
            clipRegionEnabled: true,
            prjCoordSys: null,
            overlapDisplayed: false,
            overlapDisplayedOptions: null,
            opacity: 0.5,
            alt: '',
            pane: 'titlePane',
            interactive: true,
            crossOrigin: false,
            errorOverlayUrl: false,
            zIndex: 1,
            className: '',
            attribution: "Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>",
            updateInterval: 150
        };
        imageLayer = L.supermap.imageMapLayer(url, tempOptions);
        expect(imageLayer).not.toBeNull();
        expect(imageLayer.options.layersID).toBeNull();
        expect(imageLayer.options.redirect).toBeFalsy();
        expect(imageLayer.options.transparent).toBeNull();
        expect(imageLayer.options.cacheEnabled).toBeNull();
        expect(imageLayer.options.clipRegionEnabled).toBeTruthy();
        expect(imageLayer.options.prjCoordSys).toBeNull();
        expect(imageLayer.options.overlapDisplayed).toBeFalsy();
        expect(imageLayer.options.overlapDisplayedOptions).toBeNull();
        expect(imageLayer.options.opacity).toBe(tempOptions.opacity);
        expect(imageLayer.options.alt).toBe('');
        expect(imageLayer.options.pane).toBe(tempOptions.pane);
        expect(imageLayer.options.attribution).toBe(tempOptions.attribution);
        expect(imageLayer.options.className).toBe('');
        expect(imageLayer.options.crossOrigin).toBeFalsy();
        expect(imageLayer.options.errorOverlayUrl).toBeFalsy();
        expect(imageLayer.options.interactive).toBeTruthy();
        expect(imageLayer.options.zIndex).toBe(tempOptions.zIndex);
        expect(imageLayer.options.updateInterval).toBe(tempOptions.updateInterval);

    });

    it('getOpacity', function () {
        var tempOptions = {
            opacity: 0.5,
            zIndex: 1
        };
        imageLayer = L.supermap.imageMapLayer(url, tempOptions);
        var opacity = imageLayer.getOpacity();
        expect(opacity).not.toBeNull();
        expect(opacity).toBe(tempOptions.opacity);
    });

    it('setOpacity', function () {
        var opacity = 0.9;
        imageLayer = L.supermap.imageMapLayer(url);
        expect(imageLayer.setOpacity(opacity)).not.toBeNull();
        expect(imageLayer.getOpacity()).toBe(opacity);
    });


    it('bringToFront', function (done) {
        imageLayer1 = L.supermap.imageMapLayer(url).addTo(map);
        imageLayer1.on('load', function () {
            expect(imageLayer1.bringToFront()).not.toBeNull();
            expect(imageLayer1.options.position).toBe("front");
            done();
        });
    });


    it('bringToBack', function (done) {
        imageLayer1 = L.supermap.imageMapLayer(url).addTo(map);
        imageLayer1.on('load', function () {
            expect(imageLayer1.bringToBack()).not.toBeNull();
            expect(imageLayer1.options.position).toBe("back");
            done();
        });
    });

    it('getImageUrl', function () {
        imageLayer = L.supermap.imageMapLayer(url).addTo(map);
        expect(imageLayer.getImageUrl()).not.toBeNull();
        expect(imageLayer.getImageUrl()).toBe("http://localhost:8090/iserver/services/map-world/rest/maps/World/image.png?&redirect=false&transparent=false&cacheEnabled=true&overlapDisplayed=false");
    });

    it('getImageUrl_tilePoxy', function () {
        imageLayer = L.supermap.imageMapLayer(url, {tileProxy: 'tileProxy'});
        expect(imageLayer.getImageUrl()).not.toBeNull();
        expect(imageLayer.getImageUrl()).toBe("tileProxyhttp%3A%2F%2Flocalhost%3A8090%2Fiserver%2Fservices%2Fmap-world%2Frest%2Fmaps%2FWorld%2Fimage.png%3F%26redirect%3Dfalse%26transparent%3Dfalse%26cacheEnabled%3Dtrue%26overlapDisplayed%3Dfalse");
    });

    it('update_zoomIn', function (done) {
        imageLayer = L.supermap.imageMapLayer(url).addTo(map);
        var oldUrl, newUrl;
        imageLayer.on('load', function () {
            oldUrl = imageLayer._currentImage._url;
            expect(oldUrl).toBe('http://localhost:8090/iserver/services/map-world/rest/maps/World/image.png?viewBounds=%7B%22leftBottom%22%3A%7B%22x%22%3A-19567879.241005123%2C%22y%22%3A-19567879.24100514%7D%2C%22rightTop%22%3A%7B%22x%22%3A19567879.241005123%2C%22y%22%3A19567879.241005138%7D%7D&width=500&height=500&redirect=false&transparent=false&cacheEnabled=true&overlapDisplayed=false');
            map.zoomIn();
            imageLayer.off('load');
            imageLayer.on('load', function () {
                newUrl = imageLayer._currentImage._url;
                expect(newUrl).toBe('http://localhost:8090/iserver/services/map-world/rest/maps/World/image.png?viewBounds=%7B%22leftBottom%22%3A%7B%22x%22%3A-9783939.620502561%2C%22y%22%3A-9783939.620502561%7D%2C%22rightTop%22%3A%7B%22x%22%3A9783939.620502561%2C%22y%22%3A9783939.620502565%7D%7D&width=500&height=500&redirect=false&transparent=false&cacheEnabled=true&overlapDisplayed=false');
                expect(oldUrl).not.toEqual(newUrl);
                done();
            });
        });
    });

});