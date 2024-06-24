$('#content').append("<h3>" + title + "<span class='ver'> (마지막 수정일시: " + documentVer + ")</span></h3>");

if (desc || url) {
    const content = $('#content').append('<table></table>');

    const info_table = content.find('table:last');

    if (desc) { info_table.append("<tr><th width='100'>기능</th><td><xmp>" + desc + "  (아래 둘중 하나 골라서 사용)</xmp></td></tr>"); }
    if (url) { info_table.append("<tr><th>URL</th><td><xmp>" + getAPIURL(url) + "</xmp></td></tr>"); }
}

if (request_string) {
    const request = apiStringToObject(request_string);

    $('#content').append("<span class='info'>※ 필수값이 아니고 해당사항이 없는경우는 미선언 하시면 됩니다.</span>\n\n");

    const content = $('#content').append('<table>' + apiTableHeadHTML('요청') + '</table>');

    const request_table = content.find('table:last');

    for(const row of request) {
        request_table.append(apiTableBodyHTML('request', row));
    }
}

if (response_string) {
    const response = apiStringToObject(response_string);

    const content = $('#content').append('<table>' + apiTableHeadHTML('응답') + '</table>');

    const response_table = content.find('table:last');

    for(const row of response) {
        response_table.append(apiTableBodyHTML('response', row));
    }
}

if (request_example) {
    $('#content').append("<h3>XML 요청 예시</h3><div class='code'><pre><xmp>" + request_example + "</xmp></pre></div>");
}

if (response_example) {
    $('#content').append("<h3>XML 응답 예시</h3><div class='code'><pre><xmp>" + response_example + "</xmp></pre></div>");
}

if (result_code) {
    $('#content').append("<h3>결과코드리스트</h3><div class='code'><pre><xmp>" + result_code + "</xmp></pre></div>");
}