// 필드·코드 검색 (search.json) + 큰 표 행 필터
(function () {
    var q = document.getElementById("q"), out = document.getElementById("results"), index = null;
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"}[c]; }); }
    function show() {
        var k = q.value.trim().toLowerCase();
        if (!k || !index) { out.innerHTML = ""; return; }
        var hit = [];
        for (var i = 0; i < index.length && hit.length < 30; i++) {
            var e = index[i];
            if ((e.f + " " + e.d).toLowerCase().indexOf(k) >= 0) hit.push(e);
        }
        out.innerHTML = hit.length ? hit.map(function (e) {
            return "<li><a href=\"" + e.u + "\">" + esc(e.f) + " <small>" + esc(e.d ? e.d + " · " : "") + esc(e.p) + "</small></a></li>";
        }).join("") : "<li><small>결과 없음</small></li>";
    }
    q.addEventListener("input", function () {
        if (index) return show();
        fetch("search.json").then(function (r) { return r.json(); }).then(function (d) { index = d; show(); });
    });
    Array.prototype.forEach.call(document.querySelectorAll("table.filterable"), function (t) {
        var box = document.createElement("input");
        box.type = "search"; box.className = "filter"; box.placeholder = "표 안에서 찾기";
        t.parentNode.insertBefore(box, t);
        box.addEventListener("input", function () {
            var k = box.value.trim().toLowerCase();
            Array.prototype.forEach.call(t.tBodies[0].rows, function (r) {
                r.style.display = !k || r.textContent.toLowerCase().indexOf(k) >= 0 ? "" : "none";
            });
        });
    });
})();
