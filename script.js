document.getElementById("calculate").addEventListener("click", function() {
    const name = document.getElementById("name").value.trim();
    const dob = new Date(document.getElementById("dob").value);
    
    if (name === "" || isNaN(dob)) {
      alert("कृपया तुमचं नाव आणि जन्मतारीख भरा.");
      return;
    }
    
    const rashiFromName = getRashiFromName(name);
    const today = new Date();
    const luckPercentage = calculateLuckPercentage(dob, today);
    const advice = getAstrologicalAdvice(dob);
    
    // Show the result
    document.getElementById("luck-percent").textContent = `${luckPercentage}%`;
    document.getElementById("advice-text").textContent = advice;
    document.getElementById("today-date").textContent = formatDate(today);
    document.getElementById("rashi-name").textContent = `तुमची राशी: ${rashiFromName}`;
    document.getElementById("result").style.display = "block";
  });
  
  // Function to calculate Rashi based on Name using Numerology
  function getRashiFromName(name) {
    const letterToNumber = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 1,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 1, 'r': 2,
      's': 3, 't': 4, 'u': 5, 'v': 6, 'w': 7, 'x': 8, 'y': 1, 'z': 9
    };
    
    const nameLowerCase = name.toLowerCase();
    let total = 0;
    
    // Sum the numbers corresponding to each letter in the name
    for (let i = 0; i < nameLowerCase.length; i++) {
      const letter = nameLowerCase[i];
      if (letterToNumber[letter]) {
        total += letterToNumber[letter];
      }
    }
    
    // Reduce the total to a single-digit number
    while (total > 9) {
      total = total.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    
    return getRashiFromNumber(total);
  }
  
  // Map the numerology sum to a Rashi
  function getRashiFromNumber(num) {
    switch (num) {
      case 1: return "मेष (Aries)";
      case 2: return "वृषभ (Taurus)";
      case 3: return "मिथुन (Gemini)";
      case 4: return "कर्क (Cancer)";
      case 5: return "सिंह (Leo)";
      case 6: return "कन्या (Virgo)";
      case 7: return "तुला (Libra)";
      case 8: return "वृश्चिक (Scorpio)";
      case 9: return "धनु (Sagittarius)";
      default: return "मकर (Capricorn)"; // in case of 1 again
    }
  }
  
  function calculateLuckPercentage(dob, today) {
    // Calculate based on the sum of the digits of the birth date and today's date
    const birthDay = dob.getDate();
    const birthMonth = dob.getMonth() + 1; // Months are 0-based
    const birthYear = dob.getFullYear();
    
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    
    // Simple sum of digits calculation for luck (mod 100 for percentage)
    const dobSum = sumOfDigits(birthDay) + sumOfDigits(birthMonth) + sumOfDigits(birthYear);
    const todaySum = sumOfDigits(todayDay) + sumOfDigits(todayMonth) + sumOfDigits(todayYear);
    
    let luck = (dobSum + todaySum) % 51 + 50;  // Luck between 50% to 100%
    
    return luck;
  }
  
  function sumOfDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  
  function getAstrologicalAdvice(dob) {
    // You can replace this with actual astrological logic or integrate with an API
    const zodiac = getZodiacSign(dob);
    const today = new Date();
    const horoscope = generateHoroscope(zodiac, today);
    
    return horoscope;
  }
  
  function getZodiacSign(dob) {
    const day = dob.getDate();
    const month = dob.getMonth() + 1;
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return "Aries";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return "Taurus";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return "Gemini";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      return "Cancer";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return "Leo";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return "Virgo";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return "Libra";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return "Scorpio";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return "Sagittarius";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      return "Capricorn";
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return "Aquarius";
    } else {
      return "Pisces";
    }
  }
  
  function generateHoroscope(zodiac, today) {
    // Generate a basic horoscope based on the zodiac sign in Marathi
    const horoscopes = {
      "Aries": "आज नवीन आव्हान स्वीकारण्याचा सर्वोत्तम दिवस आहे. तुमचं उत्साह उंचावलेलं आहे!",
      "Taurus": "आज धीर धरा. गोष्टी थोड्या संथ होऊ शकतात, पण सातत्याने तुम्हाला यश मिळेल.",
      "Gemini": "आज तुम्हाला शुभ वार्ता मिळू शकते. संधींसाठी डोळे उघडे ठेवा.",
      "Cancer": "तुमच्या कुटुंबावर लक्ष केंद्रित करा. आजचा दिवस नातेसंबंधांना प्रोत्साहित करण्यासाठी चांगला आहे.",
      "Leo": "आज नेतृत्व करा. तुमचं आत्मविश्वास इतरांना प्रेरणा देईल.",
      "Virgo": "आज लहान तपशिलांवर लक्ष द्या. नेमकेपणाने तुम्ही यश प्राप्त करू शकता.",
      "Libra": "तुमचं जीवन संतुलित ठेवा. काम आणि विश्रांतीसाठी वेळ घ्या.",
      "Scorpio": "ताणतणावाच्या परिस्थितीत शांत रहा. तुमचा अंतर्निहित सामर्थ्य तुम्हाला मार्गदर्शन करेल.",
      "Sagittarius": "आज साहसाचे आकर्षण आहे. अनोळखी गोष्टी अनुभवण्यास तयार रहा.",
      "Capricorn": "कामामध्ये सातत्य राखा. लक्ष केंद्रित करा आणि मेहनत तुमचं यश निश्चित करेल.",
      "Aquarius": "नवीन कल्पनांचा स्वीकार करा. बदल तुमच्यासाठी फायदेशीर ठरू शकतो.",
      "Pisces": "आज तुमच्यातील सर्जनशीलतेला वाव द्या. तुमच्या कल्पकतेला मार्गदर्शन करा."
    };
  
    return horoscopes[zodiac] || "आज तुम्हाला चांगली आश्चर्ये दिसतील! सकारात्मक रहा!";
  }
  
  function formatDate(date) {
    return date.toLocaleDateString("mr-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  document.getElementById("calculate").addEventListener("click", function() {
    const name = document.getElementById("name").value.trim();
    const dob = new Date(document.getElementById("dob").value);
    
    if (name === "" || isNaN(dob)) {
      alert("कृपया तुमचं नाव आणि जन्मतारीख भरा.");
      return;
    }
    
    const rashiFromName = getRashiFromName(name);
    const today = new Date();
    const luckPercentage = calculateLuckPercentage(dob, today);
    const advice = getAstrologicalAdvice(dob);
    
    // Show the result
    document.getElementById("luck-percent").textContent = `${luckPercentage}%`;
    document.getElementById("advice-text").textContent = advice;
    document.getElementById("today-date").textContent = formatDate(today);
    document.getElementById("rashi-name").textContent = `तुमची राशी: ${rashiFromName}`;
    document.getElementById("result").style.display = "block";
  });
  
  // Restart Button - Reset form and results
  document.getElementById("restart").addEventListener("click", function() {
    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    
    // Hide the result and reset the displayed information
    document.getElementById("result").style.display = "none";
    document.getElementById("luck-percent").textContent = "0%";
    document.getElementById("rashi-name").textContent = "तुमची राशी: ";
    document.getElementById("advice-text").textContent = "तुमचं सल्ला लोड होत आहे...";
    document.getElementById("today-date").textContent = "";
  });
  
  