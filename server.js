var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var urls = ['https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-1--Phantom-Blood-Vol-1-Hirohiko-Araki/9781421578798?ref=grid-view&qid=1519517418901&sr=1-14', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-1--Phantom-Blood-Vol-2-Hirohiko-Araki/9781421578804?ref=grid-view&qid=1519517418901&sr=1-15', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-1--Phantom-Blood-Vol-3-Hirohiko-Araki/9781421578811?ref=grid-view&qid=1519517418901&sr=1-16', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Hirohiko-Araki/9781421578828?ref=grid-view&qid=1519517418901&sr=1-17', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-2--Battle-Tendency-Vol-2-Hirohiko-Araki/9781421578835?ref=grid-view&qid=1519517418901&sr=1-18', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-2--Battle-Tendency-Vol-3-Hirohiko-Araki/9781421578842?ref=grid-view&qid=1519517418901&sr=1-19', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-2--Battle-Tendency-Vol-4-Hirohiko-Araki/9781421578859?ref=grid-view&qid=1519517418901&sr=1-20', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-1-Hirohiko-Araki/9781421590653?ref=grid-view&qid=1519517418901&sr=1-21', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Hirohiko-Araki/9781421591575?ref=grid-view&qid=1519517418901&sr=1-22', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-3-Hirohiko-Araki/9781421591698?ref=grid-view&qid=1519517418901&sr=1-23', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-4-Hirohiko-Araki/9781421591704?ref=grid-view&qid=1519517418901&sr=1-25', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-5-Hirohiko-Araki/9781421591711?ref=grid-view&qid=1519517418901&sr=1-26', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-6-Hirohiko-Araki/9781421591728?ref=grid-view&qid=1519517418901&sr=1-27', 'https://www.bookdepository.com/JoJos-Bizarre-Adventure-Part-3--Stardust-Crusaders-Vol-7-Hirohiko-Araki/9781421591735?ref=grid-view&qid=1519517418901&sr=1-28', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-1-Inio-Asano/9781421586205?ref=grid-view&qid=1519517973950&sr=1-1', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-2-Inio-Asano/9781421586212?ref=grid-view&qid=1519517973950&sr=1-3', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-3-Inio-Asano/9781421586229?ref=grid-view&qid=1519517973950&sr=1-5', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-4-Inio-Asano/9781421586236?ref=grid-view&qid=1519517973950&sr=1-9', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-5-Inio-Asano/9781421586243?ref=grid-view&qid=1519517973950&sr=1-6', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-6-Inio-Asano/9781421586250?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Goodnight-Punpun-Vol-7-Inio-Asano/9781421586267?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Solanin-Inio-Asano/9781421523217?ref=grid-view&qid=1519517973950&sr=1-2', 'https://www.bookdepository.com/Girl-On-The-Shore-Inio-Asano/9781941220856?ref=grid-view&qid=1519518173667&sr=1-7', 'https://www.bookdepository.com/Saikano-Shin-Takahashi/9781591164777?ref=grid-view&qid=1519518278028&sr=1-1', 'https://www.bookdepository.com/Saikano-Vol-2-Shin-Takahashi/9781591164746?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Saikano-Vol-3-Shin-Takahashi/9781591164753?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-1-Takeshi-Obata-Tsugumi-Ohba/9781421501680?ref=grid-view&qid=1519518335154&sr=1-2', 'https://www.bookdepository.com/Death-Note-Vol-2-Tsugumi-Ohba-Takeshi-Obata/9781421501697?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-3-Tsugumi-Ohba-Takeshi-Obata/9781421501703?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-4-Tsugumi-Ohba/9781421503318?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-5-Tsugumi-Ohba-Takeshi-Obata/9781421506265?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-6-Tsugumi-Ohba-Takeshi-Obata/9781421506272?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-7-Tsugumi-Ohba-Takeshi-Obata/9781421506289?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-8-Tsugumi-Ohba-Takeshi-Obata/9781421506296?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-9-Tsugumi-Ohba-Takeshi-Obata/9781421506302?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-10-Tsugumi-Ohba-Takeshi-Obata/9781421511559?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-11-Tsugumi-Ohba-Takeshi-Obata/9781421511788?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Death-Note-Vol-12-Tsugumi-Ohba-Takeshi-Obata/9781421513270?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-1-Hiromu-Arakawa/9781421540184?ref=grid-view&qid=1519518521295&sr=1-1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-2-Hiromu-Arakawa/9781421540191?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-3-Hiromu-Arakawa/9781421540207?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-4-Hiromu-Arakawa/9781421554914?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-5-Hiromu-Arakawa/9781421554921?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-6-Hiromu-Arakawa/9781421554938?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-7-Hiromu-Arakawa/9781421554945?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-8-Hiromu-Arakawa/9781421554969?ref=pd_detail_1_sims_b_p2p_1', 'https://www.bookdepository.com/Fullmetal-Alchemist-3-in-1-Edition-Vol-9-Hiromu-Arakawa/9781421554976?ref=pd_detail_1_sims_b_p2p_1'];

const getData = urls => {
  let promises = urls.map((url) => {
    let promise = new Promise((resolve, reject) => {
      request(url, function(error, response, body) {
        if (error) {
          console.log('message ' + error);
          reject(error);
        }
        console.log('Status code: ' + response.statusCode);
        var $ = cheerio.load(body);
        var obj = {};
        $('body').filter(function(index) {
          obj.title = $('h1[itemprop="name"]').text().trim();
          obj.author = $('a[itemprop="author"]').eq(0).text().trim();
          obj.price = $('.sale-price').text().trim();
          obj.img = $('.book-img').attr('src');
          $('.read-more').remove();
          obj.description = $('.item-excerpt').text().trim();
          obj.details = {};
          obj.details[$('.biblio-info li label').eq(0).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(0).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(1).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(2).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(2).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(3).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(3).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(4).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(4).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(5).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(5).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(6).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(6).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(7).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(7).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(8).text().replace(/\s\s+/g, ' ').trim();
          obj.details[$('.biblio-info li label').eq(8).text().replace(/\s\s+/g, ' ').trim().toLowerCase()] = $('.biblio-info li span').eq(9).text().replace(/\s\s+/g, ' ').trim();
        });
        obj.categories = [];
        $('ol.breadcrumb.category-footer').filter(function(index) {
          let ext = $('ol.breadcrumb.category-footer li.active').length;
          let element = $('ol.breadcrumb.category-footer li.active').text().replace(/\s\s+/g, ' ').trim();
          for (let i = 0; i < ext; i++) {
            obj.categories.push(element);
          }
        });
        resolve(obj);
      });
    });
    return promise;
  });
  Promise.all(promises).then((results) => {
    //console.log('Results > ' + JSON.stringify(results, null, 2));
    fs.writeFileSync(`data.json`, JSON.stringify(results, null, 2));
  }).catch((error) => {
    console.log(error);
  });
};

getData(urls);