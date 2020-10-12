var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

module.exports = {
  titles: {
    headline: ['Headline', 'Заголовок', 'Başlıq', 'Желаемая должность', 'Желаемая работа', 'Предполагаемая позиция', 'Позиция', 'Сфера деятельности', 'Position Sought', 'Пожелания к будущей работе', 'Должность'],
    personal: ['personal info', 'personal', 'details', 'personal information', 'personal details', 'ŞƏXSİ MƏLUMAT', 'ŞƏXSİ MƏLUMATLAR', 'Personal summary', 'FƏRDİ MƏLUMAT', 'FƏRDİ MƏLUMATLAR', 'Личная информация', 'Персональная информация', 'основные сведения', 'Общая информация', 'Личные данные', 'данные', 'Şəxsi göstəricilər', 'Şəxsi göstəriciləri', 'Qısa bioqrafik məlumat', 'bioqrafik məlumat', 'Məlumatlar', 'Ərizəçinin şəxsi məlumatları', 'şəxsi məlumatları', 'İş axtaranın şəxsi məlumatları', 'Сведения о себе', 'Общая информация о себе'],
    summary: ['summary', 'About', 'abstract', 'profile', 'brief', 'About Me', 'overview', 'objective', 'Personal Profile', 'objectives', 'WHO AM I', 'Career Objective', 'PROFESSIONAL SUMMARY', 'PROFESSIONAL PROFILE', 'Bio', 'Seeking position as a', 'Seeking position as an',  'PROFESSIONAL BIO', 'Personal summary', 'Personal bio', 'Career summary', 'Professional History', 'Background', 'Общие сведения', 'биография', 'Цель', 'Personal statement', 'профессиональная биография', 'Обо мне', 'сводка', 'общая сводка', 'Сведения о себе', 'сведения', 'Qısa məlumat', 'Краткая информация', 'Краткая', 'Haqqımda', 'Ümumi məlumat', 'Məqsədim', 'Profili',  'Profil', 'Профиль', 'Haqqında', 'Peşakar profili', 'Peşakar profil', 'Xülasə', 'Məzmun', 'Karyera hədəfim', 'Karyera hədəfi', 'Hədəfi', 'Hədəfləri',  'Ümumi məlumat', 'Şəxsi Xülasə', 'Peşəkarlıqla bağlı Xülasə', 'Xüsusi Qabiliyyətlə bağlı Xülasə', 'Qısa məzmun', 'Профессиональная деятельность', 'достижение','сфера деятельности', 'Успехи и достижения', 'Məqsəd', 'Məqsədi', 'Introduction'],
    experience:  ['experience', 'career progression', 'work', 'career', 'employment record', 'employment history', 'work experience', 'Employment Experience', 'professional experience', 'Work History', 'Relevant Work Experience', 'Professional bio', 'Professional biography', 'teaching experience', 'Relevant Experience', 'Selected Experience',  'ПРОФЕССИОНАЛЬНЫЕ ДАННЫЕ', 'Professional Background', 'Профессиональный опыт', 'İş Təcrübəsi', 'Опыт работы', 'Kariyera Tarixi', 'Karyera Tarixi', 'Peşəkar təcrübə', 'Peşəkar iş təcrübəsi', 'Peşəkar təcrübəm', 'Peşəkar təcrübəsi', 'İŞ TƏCRÜBƏSİ / WORK EXPERIENCE', 'Ərizəçinin iş təcrübəsi haqqında məlumatları', 'Ərizəçinin iş təcrübəsi haqqında məlumatlar', 'İş təcrübəm', 'Peşəkar iş təcrübəm', 'Опыт работы', 'РАБОЧИЙ ОПЫТ', 'Трудовая и иная деятельность', 'Трудовая деятельность', 'EMPLOYMENT', 'Career Highlights', 'Experience highlights', 'EDUCATION AND TRAINING', 'Təhsil və təlim kursları', 'Təhsil və təlim', 'Təlim və təhsil', 'Military experience'],
    education: ['E D U C A T I O N', 'education', 'education and training', 'education & training',  'higher education', 'Educational qualifications', 'Education highlights', 'ACADEMIC QUALIFICATIONS', 'QUALIFIED UNIVERSITY', 'QUALIFIED UNIVERSITIES', 'ACADEMIC BACKGROUND', 'ACADEMIC DETAILS', 'ACADEMIC  RECORD', 'Education and Qualifications', 'Education & Qualifications', 'Образование', 'TƏHSİL', 'Ərizəçinin təhsili haqqında məlumatları', 'Ərizəçinin təhsili haqqında məlumatlar', 'Təhsili', 'Təhsil haqqında məlumatlar', 'AKADEMİK NAİLİYYƏTLƏR', 'Основное образование', 'Education, Honors, and Certifications', 'Ali təhsil', 'Ali təhsili','secondary education', 'Дополнительное образование', 'Auxiliary Education'],
    skills: ['skills', 'technical skills & languages', 'Skills & Expertise', 'AREAS OF EXPERTISE', 'skills summary', 'expertise’, ‘technologies', 'KEY SKILLS AND COMPETENCIES', 'Skills & Competencies', 'Skills and Competencies', 'Skills/Competencies', 'competencies', 'competency', 'qualifications', 'strengths', 'strength', 'Key Skills', 'Primary Skills', 'professional skills', 'professional', 'related skills', 'language and computer skills', 'summary of qualifications', 'summary of skills', 'Qualifications summary', 'SKILLS AND ABILITIES', 'special skills', 'SPECIAL SKILLS AND ABILITIES', 'Core Competencies/Skills', 'Core Skills', 'Core Competencies',   'Core Competencies and Skills',   'Core Competencies & Skills',  'KEY SKILLS & COMPETENCIES', 'KEY SKILLS/COMPETENCIES', 'HARD & SOFT SKILLS',  'HARD AND SOFT SKILLS', 'Core Competencies/Areas of Expertise', 'Профессиональные навыки', 'Знания и опыт', 'Şəxsi bacarıq və qabilliyətlər', 'Əsas Keyfiyyət və Bacarıqlar', 'Relevant skills', 'MÜTƏXƏSSİS OLDUĞU SAHƏLƏR', 'Experience & Skills', 'Знания и опыт', 'Ключевые знания и навыки', 'Навыки и умения', 'Навыки', 'specialties', 'specialties, capabilities', 'specialties & capabilities', 'specialties and capabilities', 'specialties/capabilities', 'Ключевые навыки', 'Bacarıqlar', 'ТРУДОВЫЕ НАВЫКИ', 'Трудовые навыки и умения', 'Əsas bacarıqlar', 'Əsas bilik və bacarıqlar', 'lists of skills', 'Skills/Training','Digital skills','tech skills','technical skills', 'technical', 'personal skills','personality skills','soft skills', 'soft','technology','computer','computer skills','software skills', 'software','additional skills','Kompüter bacarıq və qabiliyyəti','KOMPÜTER BİLİYİ','Kamputer bilgisi','Kompyuter biliyi','Kompyuter bilikləri', 'Kompüter bilikləri', 'Texniki biliklər', 'Texniki bilikləri' , 'KOMPYUTER BACARIQLARI','KOMPÜTER BACARIQLARI', 'KOMPÜTER BİLİYİ / IT SKILLS', 'IT Skills','Komputer proqramları', 'Komputer bilikləri', 'Komputer bilgisi', 'Komputer bacarıqları','Relevant IT skills','Relevant Software skills','ЛИЧНЫЕ КАЧЕСТВА', 'Vocational Experience','Компьютерные навыки','Личные характеристики и прочее','Личные характеристики', 'Знание компьютера','Interpersonal and Teamwork Skills', 'Quantitative Skills','Владение компьютером','Технические навыки','Личные качества','Специальные навыки','ДОПОЛНИТЕЛЬНЫЕ ТРУДОВЫЕ НАВЫКИ','Programming skills', 'Coding skills','Other skills'],
    languages: ['languages', 'language skills', 'foreign languages', 'Владение иностранными языками', 'Xarici dillər', ' Dil Biliyi', 'Dil bilgisi', 'DİL BİLMƏ BACARIQLARI', 'DİL BİLİYİ / LANGUAGE SKILLS', 'DİLLƏR', 'Dil bacarığı', 'Dil bilikləri', 'Владение языками', 'Иностранные языки', 'Знание языков','Знание иностранных языков', 'Иностранные языки и прочие навыки', 'Языки'],
    courses: ['Treninqlər', 'İŞTİRAK ETDİYİNİZ TƏLİM VƏ TRENİNQLƏR', 'İŞTİRAK ETDİYİM TƏLİM VƏ TRENİNQLƏR', 'İŞTİRAK ETDİYİNİZ TRENİNQLƏR', 'İŞTİRAK ETDİYİNİZ TƏLİMLƏR', 'Təlimlər', 'Seminarlar ', 'Təlim və seminarlar', 'Təlimlər, seminarlar', 'Təlim, treninq, seminarlar', 'Treninq və seminarlar', 'İştirak etdiyim təlimlər', 'İştirak etdiyim təlim və treninqlər', 'İştirak etdiyim təlim və seminarlar', 'İştirak etdiyi Kurs/treyninq /seminarın mövzusu', 'Treyninqlər', 'Treyninq və seminarlar', 'Kurslar', 'İXTİSASARTIRMA TƏHSİLİ', 'İXTİSASARTIRMA', 'İXTİSASARTIRMA TƏHSİLİ və fərdi inkişaf', 'Fərdi inkişaf', 'İXTİSASARTIRMA kursları', 'İXTİSAS ARTIRMA kursları', 'Bilik və bacarıqların təkmilləşməsi', 'kurs, treyninq, seminar', 'iştirak etdiyi kurs, treyninq, seminar', 'BİTİRDİYİNİZ MƏŞĞƏLƏ və KURSLAR', 'Məşğələlər', 'Məşğələ və kurslar', 'Ərizəçinin əlavə getdiyi kurslar haqqında məlumatları', 'İştirak etdiyi məşğələlər', 'Kurs/treyninq /seminar', 'Kurs/treyninq /seminarlar', 'Təlim', 'Qabaqcıl Təlim Kursları', 'Təlim Kursları', 'Təlim və kurslar', 'Курсы и тренинги', 'Повышение квалификации', 'Повышение квалификации (курсы)', 'PROFESSIONAL TRAINING', 'Training', 'Personal development', 'Courses', 'Seminars', 'Courses attended', 'Training & Seminars', 'Personal development courses', 'Workshops', 'Training, Seminars, Workshops', 'training course', 'training courses',   'Training/ Seminars/Workshops', 'Career development courses', 'Personal development courses', 'Seminars & Conferences', 'Seminars and Conferences', 'Conferences and Seminars', 'Conferences & Seminars', 'Conferences', 'Professional development', 'Continuing Education',  'Профессиональное развитие', 'Курсы профессионального развития', 'Личное развитие', 'курсы', 'обучение', 'обучение и подготовка', 'Курсы и семинары', 'семинары', 'тренинг', 'профессиональная подготовка', 'профессиональное обучение', 'курсы повышения квалификации', 'курсы для повышения квалификации', 'Семинары и конференции', 'Семинары & конференции', 'конференции', 'продолжая образование', 'Конференции и семинары', 'Конференции/семинары', 'Семинары/Конференции', 'Seminar və konfranslar', 'Konfrans və seminarlar', 'İştirak etdiyi konfrans və seminarlar', 'Konfranslar', 'İştirak etdiyi konfranslar'],
    projects: ['projects', 'portfolio', 'my portfolio', 'RESEARCH INTERESTS', 'RESEARCHES', 'portfolio', 'Projects implemented', 'Implemented projects', 'Ongoing projects', 'Projects authored', 'Authored projects', 'Programs', 'Projects & Programs', 'проекты', 'Проекты и программы', 'ИССЛЕДОВАНИЯ', 'мое портфолио', 'портфолио', 'Реализованные проекты', 'Layihələr', 'Layihələri', 'Layihələrim', 'Həyata keçirdiyim layihələr', 'Həyata keçirdiyi layihələr', 'Müəllifi olduğum layihələr', 'Layihə və tədqiqatlar', 'Tədqiqatlarım', 'Layihə və tədqiqatlarım', 'Layihə və araşdırmalar', 'Araşdırmalar'],
    contacts:  ['contacts', 'contact', 'Contact Information',  'Contact details', 'Contact info', 'ƏLAQƏ', 'Контактные данные', 'Əlaqə vasitələri', 'Контактная информация', 'Контакт', 'Контакты', 'CONTACT ME', 'Mənimlə əlaqə', 'Əlaqə vasitələrim'],
    positions: ['positions', 'position'],
    websites: [
    'profiles',
    'sosial şəbəkə hesabları',
    'sosial',
    'sosial şəbəkə',
    'sosial profil',
    'sosial linklər', 
    'sosial şəbəkə linkləri',
    'linklər',
    'Социальные ссылки',
    'Sosial hesab',
    'соц. сети',
    'соцсети',
    'Социальные аккаунты ',
    'социальные сети',
    'социальная сеть',
    'социальные закладки',
    'social connect',
    'social-profiles',
    'social profiles',
    'social networks',
    'social network',
    'social links',
    'links',
    'social media',
    'sosial media',
    'sosial mediya',
    'sosial media hesabları',
    'социальные медиа',
    'сеть',
    'sosial media profilləri',
    'sosial media profili',
    'социальный профиль',
    'Социальные профили',
    'соц. профили',
    'veb ünvanı',
    'internet səhifəsi',
    'veb səhifə',
    'veb sayt',
    'veb',
    'veb link',
    'web link',
    'web links ',
    'veb səhifəsi',
    'web-site',
    'интернет-сайт',
    'веб-узел',
    'Интернет-сайт',
    'вебсайт',
    'сайт',
    ],
    awards: ['awards', 'honors', 'certification', 'certificates', 'certification and awards', 'certificates & awards', 'certificates/awards', 'certification & awards', 'certification/ awards', 'HONORS/AWARDS',  'HONORS & AWARDS', 'HONORS and AWARDS', 'licenses & certifications', 'Сертификаты', 'сертификаты и награды', 'награды', 'сертификация', 'лицензии и сертификаты', 'лицензии', 'сертификаты и лицензии', 'награды и сертификаты', ' сертификаты/награды', 'сертификаты/лицензии', 'Mükafatlar', 'Mükafatlarım', 'Mükafatları', 'Aldığı mükafatlar', 'Qazandığı mükafatlar', 'Mükafat və sertifikatlar', 'Qazandığı mükafat və sertifikatlar', 'Sertifikatlar', 'Sertifikatları', 'Sertifikatlarım', 'Sertifikat və mükafatlar', 'Lisenziyalar', 'Lisenziya və mükafatlar', 'Lisenziya və sertifikatlar', 'Lisenziya və sertifikatları', 'Patentlər', 'Patentlər və lisenziyalar', 'Patentlərim', 'Patents', 'Patent', 'патент', 'Патенты', 'Certificates and Clearances', 'Selected projects', 'Seçilmiş layihələrim', 'Seçilmiş layihələr', 'Избранные проекты', 'academic projects', 'other certificates','digər sertifikatlar','другие сертификаты'],
    additional: ['Дополнительная информация', 'Дополнительно', 'Other (additional specialties, capabilities)', 'DİGƏR BİLGİLƏR VƏ BACARIQLAR','Digər bilik və bacarıqlar','digər biliklər','digər bacarıqlar','Digər', 'Əlavə məlumat','Digər', 'Дополнительные сведения',' ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ','Other', 'Others', 'Additional info', 'Additional', 'Additional details', 'Additional information', 'Additional details', 'Other details'],
    interests: ['interests'],
    references: ['reference', 'references', 'professional references', 'Testimonials', 'референт', 'рекомендации', 'рекомендация', 'Rekommendasiyalar', 'Tövsiyyələr', 'Tövsiyyələrim', 'Məni tövsiyyə edənlər', 'Recommendations', 'Rekomendasiyalar', 'Rekomendasiyaları', 'İstinadlar', 'Tövsiyələr',  'Məni tövsiyə edənlər',  'Tövsiyə edən şəxslər',  'Tövsiyyə edən şəxslər', 'профессиональные рекомендации', 'Референс-лист', 'TÖVSİYYƏ EDƏ BİLƏN ŞƏXSLƏR',  'Sizi tövsiyyə edə biləcək şəxslər', 'Tövsiyyə məktubları', 'Kəfil']
  },
  profiles: [
  [
  'github.com',
  function(url, Resume, profilesWatcher) {
    let newUrl = url;
    if(!url.includes("http"))
      newUrl = "https://" + url;
    download(newUrl, function(data, err) {
      if (data) {
        var $ = cheerio.load(data),
        fullName = $('.vcard-fullname').text(),
        location = $('.octicon-location')
        .parent()
        .text(),
        mail = $('.octicon-mail')
        .parent()
        .text(),
        link = $('.octicon-link')
        .parent()
        .text(),
        clock = $('.octicon-clock')
        .parent()
        .text(),
        company = $('.octicon-organization')
        .parent()
        .text();

        Resume.addObject('github', {
          name: fullName,
          location: location,
          email: mail,
          link: link,
          joined: clock,
          company: company,
        });
      } else {
        return console.log(err);
      }
          //profilesInProgress--;
          profilesWatcher.inProgress--;
        });
  },
  ],
  [
  'linkedin.com',
  function(url, Resume, profilesWatcher) {
    let newUrl = url;
    if(!url.includes("http"))
      newUrl = "https://" + url;
    download(newUrl, function(data, err) {
      if (data) {
        var $ = cheerio.load(data),
        linkedData = {
          positions: {
            past: [],
            current: {},
          },
          languages: [],
          skills: [],
          educations: [],
          volunteering: [],
          volunteeringOpportunities: [],
        },
        $pastPositions = $('.past-position'),
        $currentPosition = $('.current-position'),
        $languages = $('#languages-view .section-item > h4 > span'),
        $skills = $(
          '.skills-section .skill-pill .endorse-item-name-text'
          ),
        $educations = $('.education'),
        $volunteeringListing = $('ul.volunteering-listing > li'),
        $volunteeringOpportunities = $(
          'ul.volunteering-opportunities > li'
          );

        linkedData.summary = $('#summary-item .summary').text();
        linkedData.name = $('.full-name').text();
            // current position
            linkedData.positions.current = {
              title: $currentPosition.find('header > h4').text(),
              company: $currentPosition.find('header > h5').text(),
              description: $currentPosition.find('p.description').text(),
              period: $currentPosition.find('.experience-date-locale').text(),
            };
            // past positions
            _.forEach($pastPositions, function(pastPosition) {
              var $pastPosition = $(pastPosition);
              linkedData.positions.past.push({
                title: $pastPosition.find('header > h4').text(),
                company: $pastPosition.find('header > h5').text(),
                description: $pastPosition.find('p.description').text(),
                period: $pastPosition.find('.experience-date-locale').text(),
              });
            });
            _.forEach($languages, function(language) {
              linkedData.languages.push($(language).text());
            });
            _.forEach($skills, function(skill) {
              linkedData.skills.push($(skill).text());
            });
            _.forEach($educations, function(education) {
              var $education = $(education);
              linkedData.educations.push({
                title: $education.find('header > h4').text(),
                major: $education.find('header > h5').text(),
                date: $education.find('.education-date').text(),
              });
            });
            _.forEach($volunteeringListing, function(volunteering) {
              linkedData.volunteering.push($(volunteering).text());
            });
            _.forEach($volunteeringOpportunities, function(volunteering) {
              linkedData.volunteeringOpportunities.push($(volunteering).text());
            });

            Resume.addObject('linkedin', linkedData);
          } else {
            return console.log(err);
          }
          profilesWatcher.inProgress--;
        });
  },
  ],
  'facebook.com',
  'fb.com',
  'bitbucket.org',
  'stackoverflow.com',
  ],
  inline: {
    //address: 'address',
    skype: ['skype'],
    fullName: ['Name', 'Full name', 'Name and Contact Info', 'first name, middle name, last name', 'first name, patronymic, and last name', 'A.S.A', 'Ad və soyad', 'Adı və soyadı', 'Ad, Familiya', 'Ad və Familiya', 'Ad, Familiya, Ata adı',  'Ad (soyad, atasının adı)', 'Soyad, ad, ata adı', 'Soyad ad ata adı',  'Ad soyad ata adı', 'Ad, soyad, ata adı', 'Ad, soyad və ata adı', 'Adı, soyadı və ata adı', 'Adı, soyadı və atasının adı', 'Adı, soyadı, ata adı', 'Adınız, soyadınız, atanızın adı', 'Adınız, soyadınız, ata adı', 'Soyadı, adı, atasının adı',  'Soyadı, adı və atasının adı', 'Tam adı', 'Tam ad', 'Bütöv ad', 'Bütöv adı', 'Имя и Фамилия', 'Ф.И.О.', 'ФИО', 'Все имена и фамилия', 'имя, отчество и фамилия', 'имя, отчество, фамилия', 'имя, фамилия, и отчество', 'имя, фамилия, отчество', 'имя/фамилия/отчество', 'Фамилия/Имя/Отчество', 'Фамилия Имя Отчество',  'Имя Фамилия Отчество', 'фамилия, имя и отчество', 'имя, отчество, фамилия', 'полное название', 'полное наименование', 'полное имя', 'Имя и фамилия полностью', 'Ad, Soyad', 'Ad / Soyad', 'Ad / Soyad / Ata adı'],
    firstName: ['First name', 'given name', 'Ad', 'Adı', 'Adınız', 'Имя', 'название'],
    lastName: ['Surname', 'Last name', 'family name',  'second name', 'Soyadı', 'Soyadınız', 'Soyad', 'Familiya', 'Фамилия'],
    middleName: ['отчество', 'второе имя', 'среднее имя', 'ata adı', 'Middle name', 'mid.name', 'mid.', 'отч.', 'middle n.'],
    country: ['страна', 'Country', 'Ölkə','Ölkəsi'],
    city: ['город', 'City', 'Home city', 'city of residence', 'Yaşadığı şəhər'],
    zip: ['Почтовый индекс', 'почтовый номер','Почтовый Код', 'Zip code','Postal code','Postal address', 'postcode', 'Poçt indeksi','Poçt ünvanı'],
    birthday: ['Дата рождения', 'Date of birth', 'Birth date', 'Birthday', 'Doğum tarixi'],
    salary: ['Желаемый уровень дохода','Зарплата','желаемый уровень зарплаты', 'Desired salary','Salary expectation']
  },
  regular: {
    name: [/(?=^|$|[^\\p{L}])(^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}$|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}$|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[\s]|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[\s]){1}/],
    email: [/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/],
    phone: [/((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/, /((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{2}[\s.-]\d{2})/],
    website: [/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/]
  }
};

// helper method
function download(url, callback) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      callback(null, error);
    }
  });
}
