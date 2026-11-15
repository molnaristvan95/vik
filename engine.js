const $ = (e) => {
    let elem,
      x;
    if (e[0] == '#') {
      x = e.substring(1);
      elem = document.getElementById(x);
    } else if (e[0] == '.') {
      x = e.substring(1);
      elem = document.getElementsByClassName(x);
    } else if (e[0] == 'n') {
      x = e.substring(1);
      elem = document.getElementsByName(x);
    } else if (e[0] == 't') {
      x = e.substring(1);
      elem = document.getElementsByTagName(x);
    }
    return elem;
  },
  create = (c) => {
    return document.createElement(c);
  },
  append = (par, chil) => {
    return par.appendChild(chil);
  },
  node = (variable, t) => {
    let txt = document.createTextNode(t);
    variable.appendChild(txt);
    return;
  },
  h = (el, h) => {
    if (h === undefined) {
      return el.innerHTML;
    } else {
      return el.innerHTML = h;
    }
  },
  it = (el, inner) => {
    if (!inner) {
      return el.innerText;
    } else {
      return el.innerText = inner;
    }
  };

console.log('Emlékeztető fut.');

let obj = {
  time: (1000 * 60 * 50),
  penta: 'penta.hu',
  clock1: 12,
  clock2: 16,
  noti: function (title, message, confirm = true, url = '') {
    let notification = new Notification(title, {
      body: message,
      icon: 'fav.png',
      requireInteraction: confirm
    });

    notification.onclick = function (event) {
      event.preventDefault();
      if (url) {
        window.open(url, '_blank');
      }
      notification.close();
    };
  },
  isconnect: function () {
    if (location.href.includes(this.penta)) {
      console.log('penta oldal felismerve');

      if (Notification.permission !== 'granted') {
        // Figyelem: A böngésző ezt csak akkor engedi, ha van valamilyen felhasználói interakció (pl. kattintás) az oldalon!
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Teszt', {
              body: 'Üzenet...OK;'
            });
          } else {
            console.log('Az értesítési engedély elutasítva vagy blokkolva.');
          }
        });
      } else {
        // Ha már meg van adva az engedély, közvetlenül jöhet az értesítés
        new Notification('Teszt', {
          body: 'Üzenet : OK, nincs teendő;',
          silent: true
        });
      }
    }
  },
  once: false,
  reminder: function () {
    if (location.href.includes(this.penta)) {
      let hour = new Date().getHours();
      if (hour == this.clock1 || hour == this.clock2) {
        this.noti('Gyógyszer 💊', 'Kérlek vedd be a gyógyszered!\nHa idekattintasz, nyitom a chatet. ❤', confirm = true, url = 'https://chat.google.com/u/0/app/home');
      }
    }
    if (this.once === false) {
      this.once = true;
      setTimeout(this.reminder, this.time);
    }
  }
};

// Helyes hozzárendelés (zárójelek nélkül)
window.onload = () => {
  obj.isconnect();

  setTimeout(() => {
    obj.reminder();
  }, 4000);
};

console.log('Emlékeztető végig betöltve.');
