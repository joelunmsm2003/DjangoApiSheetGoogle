var FileChooser = (function() {
  var createWrapper = function() {
    var wrapper = document.createElement('form');
    wrapper.classList.add('file-chooser');
    return wrapper;
  };
  var createInput = function() {
    var input = document.createElement('input');
    input.setAttribute('readonly', true);
    input.classList.add('file-chooser-input');
    return input;
  };
  var createButton = function() {
    var button = document.createElement('button');
    button.classList.add('file-chooser-button');
    return button;
  };
  
  var createClearButton = function() {
    var clearButton = document.createElement('button');
    clearButton.classList.add('file-chooser-clear');
    return clearButton;
  }
  
  var updateFileText = function(input, value) {
    input.value = value;
  };
  
  var clearFile = function(wrapper) {
    wrapper.reset();
  };
  
  var attachEvents = function(wrapper, input, button, clearButton, oldInput) {
    
    // Listen to the wrapper for clicks
    
    wrapper.addEventListener('click', function(ev) {
      ev.preventDefault();
      openFileBrowser(oldInput);
    }, false);
    
    // Ignore submitting of wrapper
    
    wrapper.addEventListener('submit', function(ev) {
      ev.preventDefault();
    });
    
    clearButton.addEventListener('click', function(ev) {
      ev.stopPropagation();
      clearFile(wrapper);
    });
    
    // Stop the old input from propagating events
    
    oldInput.addEventListener('click', function(ev) {
      ev.stopPropagation();
    });
    
    // Watch the old input for file name changes
    
    oldInput.addEventListener('change', function() {
      updateFileText(input, this.value);
    });
    
  }
  
  var openFileBrowser = function(input) {
    input.click();
  }
  
  return function(selector, options) {
    var wrapper = createWrapper();
    var input = createInput();
    var button = createButton();
    var clearButton = createClearButton();
    var oldInput = document.querySelector(selector);
    var parent = oldInput.parentNode;
    oldInput.classList.add('file-chooser-hidden');
    
    button.innerHTML = options.buttonText || 'Browse';
    
    wrapper.appendChild(input);
    wrapper.appendChild(button);
    wrapper.appendChild(clearButton);
    parent.insertBefore(wrapper, oldInput);
    wrapper.appendChild(oldInput);
    
    attachEvents(wrapper, input, button, clearButton, oldInput);
    
    return {
      open: function() {
        oldInput.click();
      }
    }
  }
  
}());

var fileBroswer = new FileChooser('.file-browser', {
  
});

var fileBrowser2 = new FileChooser('.file-browser-2', {});