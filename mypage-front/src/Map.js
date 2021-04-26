var placemarkCollections = {};
var placemarkList = {};
 
var shopList = [
    {
        'cityName': 'Москва',
        'shops': [
            {'coordinates': [55.72532368326033, 37.748675112058876], 'name': 'Рязанский проспект, 6Ас21'},
            {'coordinates': [55.701677873469, 37.57358050756649], 'name': 'Ленинский проспект, 47с2'}
        ]
    },
    {
        'cityName': 'Санкт-Петербург',
        'shops': [
            {'coordinates': [59.863210042666125, 30.37903938671841], 'name': 'Будапештская улица, 36к2'},
            {'coordinates': [59.99486277158917, 30.406505207030918], 'name': 'проспект Непокорённых'}
        ]
    }
];
 
ymaps.ready(init);
 
function init() {
 

 
    for (var i = 0; i < shopList.length; i++) {
 
     dot
        // Создаём коллекцию меток для города
        var cityCollection = new ymaps.GeoObjectCollection();
 
        for (var c = 0; c < shopList[i].shops.length; c++) {
            var shopInfo = shopList[i].shops[c];
 
            var shopPlacemark = new ymaps.Placemark(
                shopInfo.coordinates,
                {
                    hintContent: shopInfo.name,
                    balloonContent: shopInfo.name
                }
            );
 
            if (!placemarkList[i]) placemarkList[i] = {};
            placemarkList[i][c] = shopPlacemark;
 
            // Добавляем метку в коллекцию
            cityCollec tion.add(shopPlacemark);
 
        }
 
        placemarkCollections[i] = cityCollection;
 
        // Добавляем коллекцию на карту
        myMap.geoObjects.add(cityCollection);
 
    }
 
    $('select#cities').trigger('change');
}
 

 
// Клик на адрес
$(document).on('click', '#shops li', function () {
 
    var cityId = $('select#cities').val();
    var shopId = $(this).val();
 
    placemarkList[cityId][shopId].events.fire('click');
});
