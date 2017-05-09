
//state
var state = {
    items: []
}

//add
function addItem(state, item) {
    console.log("adding...")
    state.items.push({
        value: item, checked: false
    });
}

//delete
function deleteItem(state, index) {
    console.log("deleting...");
    console.log(index);
    console.log(state.items[index]);
    state.items.splice(index, 1);
}

//check
function checkItem(state, index) {
    console.log("checking...");
    console.log(index);
    console.log(state.items[index]);
    var item = state.items[index];
    item.checked = !item.checked;
    // $('span.shopping-item').toggleClass('shopping-item__checked');
}

var htmlTemplate1 = '<li>' +
        '<span class="shopping-item">';
        
var htmlTemplate2 = '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>';

//render
function renderList(state, element) {
    var listHTML = state.items.map(function (item, index) {
        var html = $(htmlTemplate1 + item.value + htmlTemplate2);
        html.find('.shopping-item-toggle').click(function (event) {
            checkItem(state, index);
            renderList(state, element);
        })
        html.find('.shopping-item-delete').click(function (event) {
            deleteItem(state, index);
            renderList(state, element);
        })
        if (item.checked === true) {
            html.find('span.shopping-item').addClass('shopping-item__checked');
            html.find('.shopping-item-toggle span').html("uncheck");
        }
        return html;
    })
    element.html(listHTML);
}

//listen
$('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    this.reset();
})