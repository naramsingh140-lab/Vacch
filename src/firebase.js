script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBK3zcdgtQPbcnu61oQbcliDrZe_Z0cilo",
    authDomain: "vacch-3423d.firebaseapp.com",
    projectId: "vacch-3423d",
    storageBucket: "vacch-3423d.firebasestorage.app",
    messagingSenderId: "12197800739",
    appId: "1:12197800739:web:dbea3568ee95af80163a96",
    measurementId: "G-94T8R0WFZ8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
