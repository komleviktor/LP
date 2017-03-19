var fs = require('fs');
// var xml2js = require('xml2js');
var jsonfile = require('jsonfile');
// var parser = require('xml2json');
var elasticsearch = require('elasticsearch');
var weather = require('weather-js');
var YQL = require('yql');
function  excel()  {
  var query = new YQL('select * from weather.forecast where (location = 94089)');

  query.exec(function (err, data) {
    var location = data.query.results.channel.location;
    // var condition = data.query.results.channel.item.condition;
    console.log('The current weather in ' + location.city + ', ' + location.region + ' is ');
  });
};

/* var getFile = function () {

  var quer = 'абакан';

  var parser = new xml2js.Parser();
  fs.readFile('cities.xml', function(err, data) {
      parser.parseString(data, function (err, result) {
          var r = result.cities.country[1].city[3];
          for(var stran in result.cities.country){
              for(var gor in result.cities.country[stran].city){
                  var city = result.cities.country[stran].city[gor];
                  if(city._.toLowerCase() == quer){
                      getInfo({name:city._, region:city.$.part, country:city.$.country, id:city.$.id});
                      return true;
                  };
              }
          }
          if(i==0) console.log('Не найдено');
      });
  });

  function getInfo(city){
      console.log(city);
  }
};
*/
function getRus() {
  var reading = JSON.parse(fs.readFileSync('./jsonData/4.json'));
  console.log(reading);
};
function xmlToJson() {
  var path = './xmlData/';
  var file = fs.readdirSync(path);
  var count = 0;
  for (var i = 0; i < file.length; i++) {
    var read = fs.readFileSync(path + file[i]);
    var json = parser.toJson(read);
    // console.log(json);
    count++;
    fs.writeFileSync('./jsonData/' + count + '.json', json);
  }
};

function parserToElastic() {
  var path = './jsonData/';
  var file = fs.readdirSync(path);
  var count = 0;

  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  var reading = JSON.parse(fs.readFileSync(path + file[0]));
  var like;
  /*
  Worksheet[0] - январь
  Row 4 -начало записей по времени и дате
  Cell[0].Data.$t - дата
  Cell[1].Data.$t - время московское
  Cell[2].Data.$t - температура градусы
  Cell[3].Data.$t - влыжность %
  Cell[4].Data.$t - точка росы
  Cell[5].Data.$t - давление,мм рт ст
  Cell[6].Data.$t - направление ветра
  Cell[7].Data.$t - скорость м/с
  Cell[8].Data.$t - облачность %
  Cell[9].Data.$t - нижняя граница облачности, м
  Cell[10].Data.$t - горизонтальная видимость, км
  Cell[11].Data.$t - погодные явления
  */
  // console.log(reading.Workbook.Worksheet[0].Table.Row[57].Cell); //cell[0] data

  count = 0;
  var weather = 'ясно';
  var city = 'не опознан';
  for (var i = 0; i < 72; i++) {
    reading = JSON.parse(fs.readFileSync(path + file[i]));
    for (var j = 0; j < reading.Workbook.Worksheet.length; j++)  {
      for (var x = 4; x < reading.Workbook.Worksheet[j].Table.Row.length; x++)  {
        if (reading.Workbook.Worksheet[j].Table.Row[x].hasOwnProperty('Cell') == true) {
          if (reading.Workbook.Worksheet[j].Table.Row[x].Cell[11] != null) {
            if (reading.Workbook.Worksheet[j].Table.Row[x].Cell[11].hasOwnProperty('Data') == true) {
              if (reading.Workbook.Worksheet[j].Table.Row[x].Cell[11].Data.hasOwnProperty('$t') == true) {
                weather = reading.Workbook.Worksheet[j].Table.Row[x].Cell[11].Data.$t;
              }
            }
          }
        };
        if (reading.Workbook.Worksheet[j].Table.Row[0].Cell.hasOwnProperty('Data') == true) {
          if (reading.Workbook.Worksheet[j].Table.Row[0].Cell.Data.hasOwnProperty('$t') == true) {
            city = JSON.parse(reading.Workbook.Worksheet[j].Table.Row[0].Cell.Data.$t.substring(reading.Workbook.Worksheet[j].Table.Row[0].Cell.Data.$t.indexOf('(')  + 14, reading.Workbook.Worksheet[j].Table.Row[0].Cell.Data.$t.indexOf(')')));
          };
        }
        count++;
        console.log(count);
        client.index({
          index: 'zubo',
          type: 'user',
          id: count,
          body: {
            city: city,
            date: (reading.Workbook.Worksheet[j].Table.Row[x].Cell[0].Data.$t),
            time: reading.Workbook.Worksheet[j].Table.Row[x].Cell[1].Data.$t,
            temperature: reading.Workbook.Worksheet[j].Table.Row[x].Cell[2].Data.$t,
            importance: reading.Workbook.Worksheet[j].Table.Row[x].Cell[3].Data.$t,
            dew_point: reading.Workbook.Worksheet[j].Table.Row[x].Cell[4].Data.$t,
            pressure: reading.Workbook.Worksheet[j].Table.Row[x].Cell[5].Data.$t,
            direction_of_the_wind: reading.Workbook.Worksheet[j].Table.Row[x].Cell[6].Data.$t,
            speed: reading.Workbook.Worksheet[j].Table.Row[x].Cell[7].Data.$t,
            cloudiness: reading.Workbook.Worksheet[j].Table.Row[x].Cell[8].Data.$t,
            the_lower_cloud: reading.Workbook.Worksheet[j].Table.Row[x].Cell[9].Data.$t,
            visibility: reading.Workbook.Worksheet[j].Table.Row[x].Cell[10].Data.$t,
            weather: weather
          }
        }, function (err, res) {
          console.log(err);
          console.log(res);
        });
      }
    }
  };
};

function getWeather() {
  var city = [
    'Сургут',
    'Краснодар',
    'Тюмень',
    'Уфа',
    'Сочи',
    'Екатеринбург',
    'Ставрополь',
    'Нижневартовск',
    'Южно-Сахалинск',
    'Москва',
    'Череповец',
    'Магнитогорск',
    'Белгород',
    'Старый Оскол',
    'Ростов-на-Дону',
    'Братск',
    'Казань',
    'Липецк',
    'Воронеж',
    'Тверь',
    'Самара',
    'Оренбург',
    'Стерлитамак',
    'Рыбинск',
    'Тула',
    'Ангарск',
    'Тольятти',
    'Ярославль',
    'Астрахань',
    'Иркутск',
    'Пермь',
    'Новосибирск',
    'Нижний Новгород',
    'Сыктывкар',
    'Нижнекамск',
    'Брянск',
    'Мурманск',
    'Санкт-Петербург',
    'Петропавловск-Камчатский',
    'Северодвинск',
    'Красноярск',
    'Вологда',
    'Томск',
    'Омск',
    'Челябинск',
    'Владимир',
    'Благовещенск',
    'Курск',
    'Новороссийск',
    'Пенза',
    'Ижевск',
    'Петрозаводск',
    'Рязань',
    'Хабаровск',
    'Волгоград',
    'Калуга',
    'Тамбов',
    'Махачкала',
    'Архангельск',
    'Кемерово',
    'Владивосток',
    'Ульяновск',
    'Владикавказ',
    'Калининград',
    'Чебоксары',
    'Саратов',
    'Курган',
    'Грозный',
    'Нижний Тагил',
    'Барнаул',
    'Абакан',
    'Якутск',
    'Таганрог',
    'Улан-Удэ',
    'Псков',
    'Саранск',
    'Смоленск',
    'Симферополь',
    'Сызрань',
    'Йошкар-Ола',
    'Иваново',
    'Балаково',
    'Чита',
    'Киров',
    'Кострома',
    'Прокопьевск',
    'Новокузнецк',
    'Орел',
    'Волжский',
    'Энгельс',
    'Дзержинск',
    'Армавир',
    'Орск',
    'Комсомольск-на-Амуре',
    'Шахты',
    'Бийск',
    'Севастополь',
    'Азов',
    'Александров',
    'Алексин',
    'Альметьевск',
    'Анапа',
    'Ангарск',
    'Анжеро-Судженск',
    'Апатиты',
    'Арзамас',
    'Армавир',
    'Арсеньев',
    'Артем',
    'Архангельск',
    'Асбест',
    'Астрахань',
    'Ачинск'
  ];
  var count = 0;
  for (var j = 0; j < city.length; j++) {
    weather.find({ search: city[j], degreeType: 'C' }, function (err, result) {
    //  console.log(result.length + ' ' + city[j]);
      for (var i = 0; i < result.length; i++) {
        count++;
        fs.writeFileSync('./Data/' + count + '.json', JSON.stringify(result[i]));
      }
    });
  }
  console.log(city.length);
};
