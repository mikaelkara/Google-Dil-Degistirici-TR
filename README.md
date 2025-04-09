**Bu Kod Ne Yapar?**

1.  **Metadata (`// ==UserScript==` bloğu):**
    * Scriptin adını, sürümünü, açıklamasını tanımlar.
    * `@match` direktifleri ile scriptin hangi sitelerde çalışacağını belirtir (`notebooklm.google.com` ve `gemini.google.com` altındaki tüm sayfalar).
    * `@grant none` ile scriptin özel Tampermonkey API'larına ihtiyaç duymadığını belirtir.
2.  **`'use strict';`:** Daha güvenli ve hatasız JavaScript kodu yazmayı sağlar.
3.  **`window.addEventListener('load', ...)`:** Sayfanın tüm içeriği (resimler, stiller vb.) yüklendikten sonra `createLanguageSwitchButton` fonksiyonunu çağırır. Bu, butonun sayfa elemanlarına sorunsuz eklenmesini sağlar.
4.  **`createLanguageSwitchButton()` Fonksiyonu:**
    * Önce `language-switch-button-tr` ID'li bir butonun zaten var olup olmadığını kontrol eder. Varsa tekrar eklemez (örneğin, sayfa içeriği dinamik olarak güncellendiğinde).
    * Bir `<button>` elementi oluşturur.
    * `id` ve `textContent` ("Dili Değiştir (TR)") özelliklerini ayarlar.
    * Soru 3'te belirtilen tüm CSS özelliklerini (`position`, `top`, `right`, `backgroundColor`, `color`, `padding`, `border`, `borderRadius`, `cursor`, `zIndex`, `boxShadow`, `transition`) doğrudan butonun `style` özelliğine atar.
    * Fare üzerine gelme (`onmouseover`) ve fare çekilme (`onmouseout`) olayları için arka plan rengini değiştiren fonksiyonlar ekler.
    * Butona tıklanıldığında (`onclick`) `changeLanguageToTurkish` fonksiyonunu çağıracak şekilde ayarlar.
    * Oluşturulan butonu sayfanın `<body>` elementinin sonuna ekler.
5.  **`changeLanguageToTurkish()` Fonksiyonu:**
    * `new URL(window.location.href)` kullanarak mevcut sayfanın URL'sini bir `URL` nesnesine dönüştürür. Bu, URL'yi parçalarına ayırmayı ve parametreleri kolayca yönetmeyi sağlar.
    * `currentUrl.searchParams` ile URL'nin sorgu parametrelerini (`?` işaretinden sonra gelen kısım) alır.
    * `searchParams.set('hl', 'tr')` komutu:
        * Eğer URL'de `hl` parametresi varsa, değerini `tr` olarak günceller.
        * Eğer URL'de `hl` parametresi yoksa, `hl=tr` parametresini ekler.
        * Eğer URL'de hiç parametre yoksa (`?` işareti yoksa), `?hl=tr` şeklinde ekler.
        * Bu yöntem, Soru 6'daki mevcut parametrelerin olması durumunu otomatik olarak doğru şekilde yönetir.
    * Yeni URL'yi `origin` (örn: `https://gemini.google.com`), `pathname` (örn: `/app`), `searchParams.toString()` (güncellenmiş parametreler, örn: `hl=tr&other=value`) ve `hash` (örn: `#history`) kısımlarını birleştirerek oluşturur.
    * `window.location.href = newUrl;` komutu ile tarayıcıyı oluşturulan yeni URL'ye yönlendirir, böylece sayfa Türkçe dil ayarıyla yeniden yüklenir.

**Nasıl Kullanılır?**

1.  Tarayıcınıza Tampermonkey (veya benzer bir userscript yöneticisi, örneğin Greasemonkey, Violentmonkey) eklentisini kurun.
2.  Tampermonkey ikonuna tıklayın ve "Yeni bir betik ekle..." veya "Create a new script..." seçeneğini seçin.
3.  Açılan editördeki mevcut içeriği silin.
4.  Yukarıdaki kodun tamamını kopyalayıp editöre yapıştırın.
5.  Dosya menüsünden "Kaydet" seçeneğine tıklayın.
6.  Artık `notebooklm.google.com` veya `gemini.google.com` sitelerinden birini ziyaret ettiğinizde, sağ üst köşede "Dili Değiştir (TR)" butonu görünmelidir. Butona tıkladığınızda sayfa Türkçe dil parametresi ile yeniden yüklenecektir.
