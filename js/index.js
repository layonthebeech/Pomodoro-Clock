$(document).ready(function() {
  var math = {
    '+': function(a, b) {
      return a + b;
    },
    '-': function(a, b) {
      return a - b;
    }
  }
  var intervalID = '';
  $('#startWork').click(function() {
    startWork();
  });

  $('#stop').click(function() {
    stopClock(intervalID);
  });

  function startWork() {
    $('.start').css('visibility', 'hidden');
    $('.plusminus').prop("disabled", true);
    $('#timer').css('background-color','red');
    var timeLeft = parseInt($('#pomTime').text() * 60);
    intervalID = window.setInterval(function() {
      if (timeLeft !== 0) {
        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft - minutes * 60;
        $('#timer').text(minutes + ':' + seconds);
      } else {
        stopClock(intervalID);
        $('.start').css('visibility', 'visible');
        $('.plusminus').prop("disabled", false);
        $('#startWork').attr('id', 'startBreak');
        $('#startBreak').text('Start Break');
        $('#startBreak').click(function() {
          startBreak();
        });
        $('#timer').text($('#breakTime').text() + ':00');
      }
    }, 1000);
  }

  function startBreak() {
    $('.plusminus').prop("disabled", true);
    $('.start').css('visibility', 'hidden');
    $('#timer').css('background-color','green');
    var timeLeft = $('#breakTime').text() * 60;
    intervalID = window.setInterval(function() {
      if (timeLeft !== 0) {
        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft - minutes * 60;
        $('#timer').text(minutes + ':' + seconds);
      } else {
        stopClock(intervalID);
        $('.start').css('visibility', 'visible');
        $('.plusminus').prop("disabled", true);
        $('#startBreak').attr('id', 'startWork');
        $('#startWork').text('Start Work');
        $('#startWork').click(function() {
          startWork();
        });
        $('#timer').text($('#pomTime').text() + ':00');
      }
    }, 1000);
  }

  function stopClock(intervalID) {
    clearInterval(intervalID);
  }

  $('.plusminus').click(function() {
    var operator = $(this).val();
    var selector = $(this).closest('div').find('div:first');
    var value = parseInt(selector.text());
    plusMinus(operator, value, selector);
  });

  function plusMinus(operator, value, selector) {
    var newValue = math[operator](value, 1);
    if (parseInt(newValue) >= 1) {
      selector.text(newValue);
      if (selector.attr('id') === 'pomTime') {
        $('#timer').text(newValue + ':00');
      }
    }
  }
});