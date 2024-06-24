function getAPIURL(path) {
    const domain = 'https://api.shopling.co.kr';

    return `${domain}/${path}?mode=1&xml_src_url=(아래 xml 데이타가 있는 url 기술)\n${domain}/${path}?mode=2     -> 소켓통신으로 바로 xml로 밀어넣을시`;
}

function apiStringToObject(string) {
    const rows = string.split("\n");

    let result = [];

    for (const row of rows) {
        const col = row.split("\t").map((item) => { return item.trim(); });

        let note = '';

        if (col[8]) {
            note = col[8].replace(' ', '&nbsp;');
        }

        result.push({
            'xml_node'      : col[0],
            'repeat'        : col[1] ?? '',
            'field'         : col[2] ?? '',
            'field_desc'    : col[3] ?? '',
            'data_type'     : col[4] ?? '',
            'format'        : col[5] ?? '',
            'max'           : col[6] ?? '',
            'mandatory'     : col[7] ?? '',
            'note'          : note
        });
    }

    return result;
}

function apiTableHeadHTML(title) {
    return `
    <tr>
        <th style='width:50px;'  >${title}   </th>
        <th style='width:150px;' >XML node   </th>
        <th style='width:30px;'  >반복       </th>
        <th style='width:100px;' >field      </th>
        <th style='width:300px;' >field 설명 </th>
        <th style='width:80px;'  >Data type  </th>
        <th style='width:50px;'  >format     </th>
        <th style='width:20px;'  >max        </th>
        <th style='width:30px;'  >필수       </th>
        <th style='width:500px;' >비고       </th>
    </tr>`;
}

function apiTableBodyHTML(div, row) {
    return `
    <tr>
        <td class='center'><xmp>${div}</xmp></td>
        <td><xmp>${row.xml_node}</xmp></td>
        <td><xmp>${row.repeat}</xmp></td>
        <td><xmp>${row.field}</xmp></td>
        <td>${row.field_desc}</td>
        <td class='center'><xmp>${row.data_type}</xmp></td>
        <td><xmp>${row.format}</xmp></td>
        <td><xmp>${row.max}</xmp></td>
        <td class='center'><xmp>${row.mandatory}</xmp></td>
        <td>${row.note}</td>
    </tr>`;
}

function getModified() {
    const lastModified = new Date(document.lastModified);

    let year = lastModified.getFullYear();
    let month = lastModified.getMonth() + 1;
    let day = lastModified.getDate();
    let hour = lastModified.getHours();
    let minute = lastModified.getMinutes();
    let second = lastModified.getSeconds();

    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    hour = hour.toString().padStart(2, "0");
    minute = minute.toString().padStart(2, "0");
    second = second.toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}