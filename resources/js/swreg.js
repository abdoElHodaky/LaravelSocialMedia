
   if ("serviceWorker" in navigator) {
      navigator.serviceWorker.
  getRegistration("/").then(d=>{if(d) return d.update()
  }).catch(console.log)
      navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
         console.log("Service worker registration succeeded:", registration);
      },
      (error) => {
         console.error(`Service worker registration failed: ${error}`);
      },
    );
  } else {
     console.error("Service workers are not supported.");
  }

    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();

        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        console.log("Registerd event");
        // Update UI notify the user they can install the PWA
        window.localStorage.setItem("pwainstalled", "false");
        //this.showInstallPromotion();
    });
    window.addEventListener("appinstalled", (evt) => {
        // Log install to analytics
        console.log("INSTALL: Success");
        window.localStorage.setItem("pwainstalled", "true");
    });

    function installButtonDisplay() {
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id", "install-button");
        btn.innerHTML = "Download LSM-App";
        btn.setAttribute("class","bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center")
        btn.onclick = function() {
          installPWA();
        }
        document.querySelector("#auth").appendChild(btn);
    }
    function installPWA() {
        if (window.deferredPrompt) {
            console.log("inside window.deferredPromp if condition");
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then((choiceResult) => {
               if (choiceResult.outcome === "accepted") { 
                  removeButton();                   
                  console.log("User accepted the install prompt");
               } else {
                  isInstalledState(false);
                  console.log("User dismissed the install prompt");
               }
           });
        }
    }
    function removeButton() {
        var elem = document.getElementById('install-button');
        elem.parentNode.removeChild(elem);
    }


installButtonDisplay()
