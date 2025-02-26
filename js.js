let counterName;

// Update the display
function updateCounter(value) {
    let el = document.getElementById('counter');
    el.innerHTML = value;
}

// Initial Load
window.addEventListener('onWidgetLoad', function (obj) {
    const { fieldData } = obj.detail;
    counterName = fieldData["counterName"];
    SE_API.counters.get(counterName).then(counter => updateCounter(counter.count));
});

// Counter Updates
window.addEventListener('onEventReceived', function (obj) {
    const listener = obj.detail.listener;
    const data = obj.detail.event;

    if (listener === 'bot:counter' && data.counter == counterName) {
        updateCounter(data.value);
    }
});

