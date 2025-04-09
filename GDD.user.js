// ==UserScript==
// @name         Google Dil Değiştirici (TR) - Otomatik Gizlenen
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Belirli Google sitelerinde (NotebookLM, Gemini) sayfayı kolayca Türkçe'ye çevirmek için buton ekler ve 5 saniye sonra gizler.
// @author       Sizin Adınız (veya bir takma ad)
// @match        https://notebooklm.google.com/*
// @match        https://gemini.google.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Sayfa yüklendiğinde butonu ekle
    window.addEventListener('load', function() {
        createLanguageSwitchButton();
    }, false);

    function createLanguageSwitchButton() {
        // Buton zaten varsa tekrar ekleme
        if (document.getElementById('language-switch-button-tr')) {
            return;
        }

        // Buton elementini oluştur
        const button = document.createElement('button');
        button.id = 'language-switch-button-tr';
        button.textContent = 'Dili Değiştir (TR)';

        // Buton stilini ayarla
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.backgroundColor = '#4CAF50'; // Yeşil arka plan
        button.style.color = 'white';           // Beyaz metin
        button.style.padding = '15px 32px';     // İç boşluk
        button.style.textAlign = 'center';
        button.style.textDecoration = 'none';
        button.style.display = 'inline-block';
        button.style.fontSize = '14px';         // Okunabilir font boyutu
        button.style.border = 'none';           // Kenarlıksız
        button.style.borderRadius = '12px';     // Yuvarlatılmış köşeler
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';          // Diğer elementlerin üzerinde kalması için
        button.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Hafif gölge
        // Geçiş efektlerini tanımla (arka plan rengi ve opaklık için)
        button.style.transition = 'background-color 0.3s ease, opacity 0.5s ease-out';
        button.style.opacity = '1'; // Başlangıçta görünür

        // Fare üzerine gelince stil (hover)
        button.onmouseover = function() {
            // Sadece buton hala görünürken hover efektini uygula
            if (parseFloat(this.style.opacity) > 0) {
                 this.style.backgroundColor = '#45a049'; // Daha koyu yeşil
            }
        };
        button.onmouseout = function() {
            this.style.backgroundColor = '#4CAF50'; // Orijinal yeşil
        };

        // Butona tıklama olayını ekle
        button.onclick = function() {
            // Sadece buton hala görünürken tıklama işlemini yap
             if (parseFloat(this.style.opacity) > 0) {
                 changeLanguageToTurkish();
            }
        };

        // Butonu sayfaya ekle
        document.body.appendChild(button);

        // 5 saniye sonra butonu gizle (fade out efektiyle)
        setTimeout(() => {
            button.style.opacity = '0'; // Opaklığı 0 yaparak fade out başlat

            // Opaklık geçişi bittikten sonra butonu tamamen kaldır (isteğe bağlı ama önerilir)
            setTimeout(() => {
                if (button.parentNode) { // Buton hala sayfada ise
                   button.style.display = 'none'; // Layout'tan kaldır
                }
            }, 500); // Opaklık geçiş süresi (0.5s = 500ms) kadar bekle
        }, 5000); // 5 saniye bekle
    }

    function changeLanguageToTurkish() {
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;

        // 'hl' parametresini 'tr' olarak ayarla veya güncelle
        searchParams.set('hl', 'tr');

        // Yeni URL'yi oluştur (hash kısmı korunur)
        const newUrl = currentUrl.origin + currentUrl.pathname + '?' + searchParams.toString() + currentUrl.hash;

        // Kullanıcıyı yeni URL'ye yönlendir
        window.location.href = newUrl;
    }
})();
