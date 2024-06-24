$('#content').append("<h3>" + title + "<span class='ver'> (마지막 수정일시: " + documentVer + ")</span></h3>");

if (info) {
    $('#content').append("<span class='info'>" + info + "</span>");
}

$('#content').append('<table></table>');

if (head_string) {
    const table = $('#content > table:last');

    const head = apiStringToObject(head_string);

    for(const row of head) {
        table.append('<tr><tr>');

        for(const[k, v] of row) {
            table.find('tr:last').append('<th style="' + style[k] + '">' + v + '</th>');
        }
    }

    if (body_string) {
        const body = apiStringToObject(body_string);

        for(const td of body) {
            table.append('<tr><tr>');

            for(const[k, v] of head) {
                table.find('tr:last').append('<td class="' + _class[k] + '">' + td[k] + '</th>');
            }
        }
    }
}