$(document).ready(function () {
  App.initHome();

  $('.expand-fullscreen').on('click', App.expandFullscreen);
  $('.compress-fullscreen').on('click', App.contractFullscreen);
  addEventListener("fullscreenchange", (event) => App.watchFullscreen(event));
    // Define the keyup event handler
  function onKeyUp(event) {
    if (event.code === 'Space') {
      console.log('Spacebar released');
      // Your code for handling Spacebar release
      const man = myPixiApp.findShapeById(App.man.user);
      App.updateOffset({user:App.man.user,offset: man.offset +App.man.offsetNumber});
      App.findUsers().then(users => {
        App.printUsers(users);
        App.users = users;
      });
      man.shiftShape(man.offset + App.man.offsetNumber);
    } else if (event.code === 'KeyG') {
      console.log('G released');
    }
  }
  // Add the keyup event listener to the document
  document.addEventListener('keyup', onKeyUp);
});
const App = {
  man: null,
  users: [],
  expandFullscreen: () => {
    $('#reg-app').get(0).requestFullscreen();
  },
  contractFullscreen: () => {
    document.exitFullscreen();
  },
  watchFullscreen: (event) => {
    console.log(event);
    if (document.fullscreenElement) {
      $('.expand-fullscreen').toggleClass('is-hidden');
      $('.compress-fullscreen').toggleClass('is-hidden');
    } else {
      $('.expand-fullscreen').toggleClass('is-hidden');
      $('.compress-fullscreen').toggleClass('is-hidden');
    }
  },
  validateForm: () => {
    // Check if any value in formData is null
    const isFormIncomplete = $('#email').val() === null || $('#email').val() === '';
    if (isFormIncomplete) {
      // If there's a null value, show validation error
      validationError('Please enteer valid email address');
      return false; // Indicate that validation failed
    }
    // Other validation logic can go here
    return true; // Indicate that validation passed
  },
  findUsers: async (user) => {
    try {
      const response = await $.ajax({
        url: "/api/v1/user/all",
        type: "GET",
        processData: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
      });
      // Check if the response status is 200
      if (response) {
        return response;
      }
    } catch (error) {
      App.handleError(error);
    }
  },
  createUser: async (user) => {
    $('.loading-overlay').addClass('is-active');
    try {
      const response = await $.ajax({
        url: "/api/v1/user/create",
        type: "POST",
        processData: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
      });
      // Check if the response status is 200
      if (response) {
        $('.loading-overlay').removeClass('is-active');
        App.handleSuccess(response);
        return response;
      }
    } catch (error) {
      $('.loading-overlay').removeClass('is-active');
      App.handleError(error);
    }
  },
  updateOffset: async (user) => {
    $('.loading-overlay').addClass('is-active');
    try {
      const response = await $.ajax({
        url: "/api/v1/user/update-offset",
        type: "POST",
        processData: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
      });
      // Check if the response status is 200
      if (response) {
        $('.loading-overlay').removeClass('is-active');
        App.handleSuccess(response);
        return response;
      }
    } catch (error) {
      $('.loading-overlay').removeClass('is-active');
      App.handleError(error);
    }
  },
  modifyUserDate: async (user) => {
    $('.loading-overlay').addClass('is-active');
    try {
      const response = await $.ajax({
        url: `/api/v1/user/update-modified/${user}`,
        type: "POST",
        processData: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
      });
      // Check if the response status is 200
      if (response) {
        $('.loading-overlay').removeClass('is-active');
        App.handleSuccess(response);
        return response;
      }
    } catch (error) {
      $('.loading-overlay').removeClass('is-active');
      App.handleError(error);
    }
  },
  handleError: (jqXHR, textStatus, errorThrown) => {
    // Handle error for other statuses
    validationError('Not a valid email');
    // Example: Show an error message
  },
  handleSuccess: (response) => {
    // Handle success (status 200)
    // Example: Show a success message or redirect
    console.log('Success:', response);
    successToast('🤚 Your hand has been raised');
  },
  onFormSubmit: async (e) => {
    const isFormValid = login.validateForm();
    if (isFormValid) {
      login.ajaxSubmit();
    }
    return;
  },
  generateUniqueId: () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters[randomIndex];
    }
    return uniqueId;
  },
  getStoredUser() {
    return localStorage.getItem('user');
  },
  clearUser() {
    localStorage.removeItem('user');
  },
  saveUser(token, callback) {
    const user = token;
    if (user) {
      localStorage.setItem('user', user);
      console.log('user id saved.');
    } else {
      console.log('No user found');
    }
    callback();
  },
  updateUsers(users) {
    const currentUsers = App.users;
  },
  printMain() {
    console.log('printing main');
    const user = myPixiApp.findShapeById(App.man.user) ? myPixiApp.findShapeById(App.man.user).shiftShape(App.man.offset) : new Shape({
      name: App.man.user,
      offset: App.man.offset,
      friction: 0.9,
      color: '#8c0f88',
      size: 20,
      trail: true
    });
    user.init();
  },
  updateUsers(user) {
    return App.users.find(u => u.user === user.user);
  },
  printUsers(users) {
    users.map(user => {
      if(user.user === App.man.user) {
        return;
      }
      
      const shape = myPixiApp.findShapeById(user.user) ? myPixiApp.findShapeById(user.user).shiftShape(user.offset) : null;
      if (!shape) {
        new Shape({
          name: user.user,
          offset: user.offset,
          friction: 0.9,
          color: App.generateRandomColor(),
          size: 20,
          trail: false
        }).init();
        console.log(shape, user);
      } else {
      shape.init()
      }
    })
  },
  initHome() {
    if (!App.getStoredUser()) {
      const user = App.createUser({
        user: App.generateUniqueId(),
        offset: 100
      });
      user.then(user => {
        App.man = user;
        App.saveUser(user.user, () => {
          App.findUsers().then(users => {
            App.printMain(user.user);
            App.printUsers(users);
            App.users = users;
          });
        })
        App.findUsers();
      })
    } else {
      const userId = App.getStoredUser();
      App.findUsers().then(users => {
        if (users && users.length > 0) {
          App.man = users.filter(user => user.user === userId)[0];
          App.printMain(App.man.user);
          App.printUsers(users);
          App.users = users;
        } else {
          App.modifyUserDate(userId).then((user) => {
            App.man = user;
            App.printMain(userId);
          })
        }
      })
    }
  },
  generateRandomColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Convert the RGB values to a hex color string
    const hexColor = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  
    // Set opacity to 50% (or "80" in hexadecimal)
    const opacity = "80";
  
    // Combine the hex color with the opacity value
    const colorWithOpacity = hexColor + opacity;
  
    return colorWithOpacity;
  }
}