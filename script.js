/* =====================================================
   Fraktal Batik Kelompok 2
   JavaScript
===================================================== */


/* =====================================================
   PALET WARNA
===================================================== */

const palettes = {

    merah: {
        name: "Merah",
        background: "#2a1111",

        colors: [
            "#e9c46a",
            "#d85c4b",
            "#a83232",
            "#6d2020",
            "#f2e5cf"
        ]
    },

    indigo: {
        name: "Indigo",
        background: "#111a32",

        colors: [
            "#e5ca77",
            "#6d9bd4",
            "#31528f",
            "#1c315f",
            "#eef2f5"
        ]
    },

    bumi: {
        name: "Bumi",
        background: "#291a12",

        colors: [
            "#e1bf8b",
            "#a66a3f",
            "#714329",
            "#45261b",
            "#f2dfc4"
        ]
    },

    hijau: {
        name: "Hijau",
        background: "#10271e",

        colors: [
            "#d9c36b",
            "#6fa883",
            "#3e7559",
            "#204c3a",
            "#edf0d8"
        ]
    },

    mono: {
        name: "Monokrom",
        background: "#171717",

        colors: [
            "#eeeeee",
            "#bdbdbd",
            "#777777",
            "#3f3f3f",
            "#fafafa"
        ]
    }

};


/* =====================================================
   VARIABEL UTAMA
===================================================== */

let currentPalette = "merah";

let nodes = 0;


/* =====================================================
   AMBIL ELEMENT HTML
===================================================== */

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");


const pattern =
    document.getElementById("pattern");

const depth =
    document.getElementById("depth");

const density =
    document.getElementById("density");

const size =
    document.getElementById("size");

const grid =
    document.getElementById("grid");

const symmetry =
    document.getElementById("symmetry");

const glow =
    document.getElementById("glow");


/* =====================================================
   RESIZE CANVAS
===================================================== */

function resizeCanvas() {

    const box =
        canvas.parentElement;

    const width =
        Math.min(
            box.clientWidth,
            900
        );


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        width * dpr;

    canvas.height =
        width * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    draw(width);

}


/* =====================================================
   BACKGROUND KAIN
===================================================== */

function drawBackground(size) {

    const palette =
        palettes[currentPalette];


    /* warna dasar */

    ctx.fillStyle =
        palette.background;

    ctx.fillRect(
        0,
        0,
        size,
        size
    );


    /* garis tenun */

    if (grid.checked) {

        ctx.save();

        ctx.globalAlpha = 0.12;

        ctx.strokeStyle =
            palette.colors[1];

        ctx.lineWidth = 1;


        for (
            let x = 0;
            x < size;
            x += 12
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                0
            );

            ctx.lineTo(
                x,
                size
            );

            ctx.stroke();

        }


        ctx.restore();

    }


    /* bingkai */

    ctx.save();

    ctx.strokeStyle =
        palette.colors[0];

    ctx.globalAlpha = 0.5;

    ctx.lineWidth = 3;


    ctx.strokeRect(
        20,
        20,
        size - 40,
        size - 40
    );


    ctx.globalAlpha = 0.15;

    ctx.lineWidth = 1;


    ctx.strokeRect(
        30,
        30,
        size - 60,
        size - 60
    );


    ctx.restore();

}


/* =====================================================
   BENTUK DIAMOND
===================================================== */

function diamond(r) {

    ctx.beginPath();

    ctx.moveTo(
        0,
        -r
    );

    ctx.lineTo(
        r,
        0
    );

    ctx.lineTo(
        0,
        r
    );

    ctx.lineTo(
        -r,
        0
    );

    ctx.closePath();

}


/* =====================================================
   MOTIF KAWUNG
===================================================== */

function kawung(
    x,
    y,
    r,
    level,
    scale = 1
) {

    nodes++;


    const colors =
        palettes[
            currentPalette
        ].colors;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    /*
       Empat bentuk oval
    */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        ctx.save();

        ctx.rotate(
            i * Math.PI / 2
        );


        ctx.beginPath();

        ctx.ellipse(
            0,
            -r * 0.48,
            r * 0.34,
            r * 0.62,
            0,
            0,
            Math.PI * 2
        );


        ctx.strokeStyle =
            colors[
                (i + level) % 4
            ];


        ctx.lineWidth =
            Math.max(
                1,
                2 * scale
            );


        ctx.stroke();

        ctx.restore();

    }


    /*
       Titik pusat
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        r * 0.16,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        colors[0];

    ctx.fill();


    /*
       REKURSI
    */

    if (level > 0) {

        const newRadius =
            r * 0.39;

        const offset =
            r * 0.75;


        kawung(
            offset,
            0,
            newRadius,
            level - 1,
            scale * 0.75
        );


        kawung(
            -offset,
            0,
            newRadius,
            level - 1,
            scale * 0.75
        );


        kawung(
            0,
            offset,
            newRadius,
            level - 1,
            scale * 0.75
        );


        kawung(
            0,
            -offset,
            newRadius,
            level - 1,
            scale * 0.75
        );

    }


    ctx.restore();

}


/* =====================================================
   MOTIF CEPLOK
===================================================== */

function ceplok(
    x,
    y,
    r,
    level,
    scale = 1
) {

    nodes++;


    const colors =
        palettes[
            currentPalette
        ].colors;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    ctx.lineWidth =
        Math.max(
            1,
            2 * scale
        );


    /*
       Diamond utama
    */

    diamond(r);


    ctx.strokeStyle =
        colors[0];

    ctx.stroke();


    /*
       Pusat
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        r * 0.18,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        colors[2];

    ctx.fill();


    /*
       Empat motif kecil
    */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        ctx.save();

        ctx.rotate(
            i * Math.PI / 2
        );


        ctx.translate(
            0,
            -r * 0.58
        );


        diamond(
            r * 0.32
        );


        ctx.strokeStyle =
            colors[
                (i + 1) % 4
            ];


        ctx.stroke();

        ctx.restore();

    }


    /*
       REKURSI
    */

    if (level > 0) {

        const newRadius =
            r * 0.42;

        const offset =
            r * 0.85;


        ceplok(
            offset,
            0,
            newRadius,
            level - 1,
            scale * 0.75
        );


        ceplok(
            -offset,
            0,
            newRadius,
            level - 1,
            scale * 0.75
        );


        ceplok(
            0,
            offset,
            newRadius,
            level - 1,
            scale * 0.75
        );


        ceplok(
            0,
            -offset,
            newRadius,
            level - 1,
            scale * 0.75
        );

    }


    ctx.restore();

}


/* =====================================================
   MOTIF TRUNTUM
===================================================== */

function truntum(
    x,
    y,
    r,
    level,
    scale = 1
) {

    nodes++;


    const colors =
        palettes[
            currentPalette
        ].colors;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    ctx.strokeStyle =
        colors[0];


    ctx.lineWidth =
        Math.max(
            1,
            1.7 * scale
        );


    /*
       Bentuk bintang
    */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const angle =
            i * Math.PI / 4;


        const x1 =
            Math.cos(angle) *
            r * 0.3;


        const y1 =
            Math.sin(angle) *
            r * 0.3;


        const x2 =
            Math.cos(angle) *
            r;


        const y2 =
            Math.sin(angle) *
            r;


        ctx.beginPath();

        ctx.moveTo(
            x1,
            y1
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.stroke();


        /*
           Titik ujung
        */

        ctx.beginPath();

        ctx.arc(
            x2,
            y2,
            r * 0.08,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            colors[
                (i + 1) % 4
            ];

        ctx.fill();

    }


    /*
       Pusat
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        r * 0.16,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        colors[2];

    ctx.fill();


    /*
       REKURSI
    */

    if (level > 0) {

        const newRadius =
            r * 0.42;

        const offset =
            r * 0.9;


        for (
            let i = 0;
            i < 6;
            i++
        ) {

            const angle =
                i * Math.PI / 3;


            truntum(

                Math.cos(angle) *
                offset,

                Math.sin(angle) *
                offset,

                newRadius,

                level - 1,

                scale * 0.73

            );

        }

    }


    ctx.restore();

}


/* =====================================================
   MOTIF PARANG
===================================================== */

function parang(
    x,
    y,
    r,
    level,
    scale = 1,
    flip = false
) {

    nodes++;


    const colors =
        palettes[
            currentPalette
        ].colors;


    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        flip
            ? -0.25
            : 0.25
    );


    ctx.lineWidth =
        Math.max(
            1,
            2 * scale
        );


    /*
       Bentuk parang
    */

    ctx.beginPath();

    ctx.moveTo(
        -r * 0.9,
        r * 0.25
    );


    ctx.quadraticCurveTo(
        -r * 0.1,
        -r * 0.9,
        r * 0.9,
        -r * 0.2
    );


    ctx.quadraticCurveTo(
        r * 0.45,
        r * 0.1,
        -r * 0.25,
        r * 0.75
    );


    ctx.closePath();


    ctx.strokeStyle =
        colors[0];

    ctx.stroke();


    /*
       Garis tengah
    */

    ctx.beginPath();

    ctx.moveTo(
        -r * 0.7,
        r * 0.4
    );

    ctx.lineTo(
        r * 0.7,
        -r * 0.3
    );


    ctx.strokeStyle =
        colors[1];

    ctx.stroke();


    /*
       REKURSI
    */

    if (level > 0) {

        parang(

            -r * 0.75,
            r * 0.65,

            r * 0.48,

            level - 1,

            scale * 0.73,

            !flip

        );


        parang(

            r * 0.75,
            -r * 0.65,

            r * 0.48,

            level - 1,

            scale * 0.73,

            !flip

        );

    }


    ctx.restore();

}


/* =====================================================
   MOTIF ULOS SADUM
===================================================== */

function sadum(
    x,
    y,
    r,
    level,
    scale = 1
) {

    nodes++;


    const colors =
        palettes[
            currentPalette
        ].colors;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    ctx.lineWidth =
        Math.max(
            1,
            1.8 * scale
        );


    /*
       Geometri utama
    */

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        ctx.save();

        ctx.rotate(
            i * Math.PI / 2
        );


        ctx.beginPath();


        ctx.moveTo(
            0,
            -r
        );


        ctx.lineTo(
            r * 0.48,
            -r * 0.42
        );


        ctx.lineTo(
            r * 0.18,
            0
        );


        ctx.lineTo(
            r * 0.48,
            r * 0.42
        );


        ctx.lineTo(
            0,
            r
        );


        ctx.lineTo(
            -r * 0.18,
            0
        );


        ctx.closePath();


        ctx.strokeStyle =
            colors[i % 4];

        ctx.stroke();


        ctx.restore();

    }


    /*
       Pusat
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        r * 0.17,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        colors[0];

    ctx.fill();


    /*
       REKURSI
    */

    if (level > 0) {

        const newRadius =
            r * 0.36;

        const offset =
            r * 0.82;


        sadum(
            offset,
            0,
            newRadius,
            level - 1,
            scale * 0.73
        );


        sadum(
            -offset,
            0,
            newRadius,
            level - 1,
            scale * 0.73
        );


        sadum(
            0,
            offset,
            newRadius,
            level - 1,
            scale * 0.73
        );


        sadum(
            0,
            -offset,
            newRadius,
            level - 1,
            scale * 0.73
        );

    }


    ctx.restore();

}


/* =====================================================
   PEMILIH MOTIF
===================================================== */

function drawMotif(
    x,
    y,
    radius,
    level
) {

    switch (
        pattern.value
    ) {

        case "kawung":

            kawung(
                x,
                y,
                radius,
                level
            );

            break;


        case "ceplok":

            ceplok(
                x,
                y,
                radius,
                level
            );

            break;


        case "truntum":

            truntum(
                x,
                y,
                radius,
                level
            );

            break;


        case "parang":

            parang(
                x,
                y,
                radius,
                level
            );

            break;


        case "sadum":

            sadum(
                x,
                y,
                radius,
                level
            );

            break;

    }

}


/* =====================================================
   FUNGSI DRAW UTAMA
===================================================== */

function draw(sizeCanvas) {

    nodes = 0;


    /*
       Bersihkan canvas
    */

    drawBackground(
        sizeCanvas
    );


    /*
       Ambil nilai input
    */

    const densityValue =
        Number(
            density.value
        );


    const recursion =
        Number(
            depth.value
        );


    const radius =
        Number(
            size.value
        );


    /*
       Menentukan jarak motif.

       Semakin tinggi density,
       semakin rapat.
    */

    const spacing =
        145 -
        densityValue * 10;


    /*
       Membuat pola utama
    */

    for (
        let row = 0;
        row < sizeCanvas / spacing + 2;
        row++
    ) {

        for (
            let col = 0;
            col < sizeCanvas / spacing + 2;
            col++
        ) {


            let x =
                45 +
                col * spacing;


            let y =
                45 +
                row * spacing;


            /*
               Pola selang-seling
            */

            if (
                row % 2 === 1
            ) {

                x +=
                    spacing / 2;

            }


            /*
               Jika simetri aktif
            */

            if (
                symmetry.checked
            ) {

                const mirror =
                    sizeCanvas - x;


                drawMotif(
                    x,
                    y,
                    radius,
                    recursion
                );


                if (
                    Math.abs(
                        mirror - x
                    ) > 5
                ) {

                    drawMotif(
                        mirror,
                        y,
                        radius,
                        recursion
                    );

                }

            }

            else {

                drawMotif(
                    x,
                    y,
                    radius,
                    recursion
                );

            }

        }

    }


    /*
       Efek benang
    */

    if (
        glow.checked
    ) {

        ctx.save();

        ctx.globalAlpha =
            0.10;


        ctx.strokeStyle =
            palettes[
                currentPalette
            ].colors[0];


        ctx.lineWidth = 1;


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const y =
                40 +
                i *
                ((sizeCanvas - 80) / 9);


            ctx.beginPath();

            ctx.moveTo(
                30,
                y
            );

            ctx.lineTo(
                sizeCanvas - 30,
                y
            );

            ctx.stroke();

        }


        ctx.restore();

    }


    updateAnalytics();

}


/* =====================================================
   UPDATE ANALYTICS
===================================================== */

function updateAnalytics() {

    const names = {

        kawung: "Kawung",

        ceplok: "Ceplok",

        truntum: "Truntum",

        parang: "Parang",

        sadum: "Ulos Sadum"

    };


    const motifName =
        names[
            pattern.value
        ];


    /*
       Slider values
    */

    document
        .getElementById(
            "depthValue"
        )
        .textContent =
        depth.value;


    document
        .getElementById(
            "densityValue"
        )
        .textContent =
        density.value;


    document
        .getElementById(
            "sizeValue"
        )
        .textContent =
        size.value;


    /*
       Analytics
    */

    document
        .getElementById(
            "statPattern"
        )
        .textContent =
        motifName;


    document
        .getElementById(
            "statDepth"
        )
        .textContent =
        depth.value;


    document
        .getElementById(
            "statPalette"
        )
        .textContent =
        palettes[
            currentPalette
        ].name;


    document
        .getElementById(
            "statNodes"
        )
        .textContent =
        nodes.toLocaleString(
            "id-ID"
        );


    /*
       Judul
    */

    document
        .getElementById(
            "title"
        )
        .textContent =
        motifName +
        " Fraktal";


    /*
       Nama motif
    */

    document
        .getElementById(
            "motifName"
        )
        .textContent =
        motifName;

}


/* =====================================================
   EVENT INPUT
===================================================== */

[
    pattern,
    depth,
    density,
    size,
    grid,
    symmetry,
    glow

].forEach(
    element => {

        element.addEventListener(
            "input",
            resizeCanvas
        );


        element.addEventListener(
            "change",
            resizeCanvas
        );

    }
);


/* =====================================================
   PILIH WARNA
===================================================== */

document
    .querySelectorAll(".color")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    /*
                       Hapus active
                       dari semua warna
                    */

                    document
                        .querySelectorAll(
                            ".color"
                        )
                        .forEach(
                            item => {

                                item.classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    /*
                       Aktifkan warna
                    */

                    button.classList.add(
                        "active"
                    );


                    /*
                       Ganti palette
                    */

                    currentPalette =
                        button.dataset.palette;


                    /*
                       Gambar ulang
                    */

                    resizeCanvas();

                }
            );

        }
    );


/* =====================================================
   BUTTON BUAT FRAKTAL
===================================================== */

document
    .getElementById(
        "generate"
    )
    .addEventListener(
        "click",
        () => {

            resizeCanvas();

        }
    );


/* =====================================================
   BUTTON ACAK
===================================================== */

document
    .getElementById(
        "random"
    )
    .addEventListener(
        "click",
        () => {


            const motifs = [

                "kawung",
                "ceplok",
                "truntum",
                "parang",
                "sadum"

            ];


            const colors =
                Object.keys(
                    palettes
                );


            /*
               Acak motif
            */

            pattern.value =
                motifs[
                    Math.floor(
                        Math.random() *
                        motifs.length
                    )
                ];


            /*
               Acak warna
            */

            currentPalette =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            /*
               Acak level
            */

            depth.value =
                2 +
                Math.floor(
                    Math.random() * 5
                );


            /*
               Acak kerapatan
            */

            density.value =
                3 +
                Math.floor(
                    Math.random() * 6
                );


            /*
               Acak ukuran
            */

            size.value =
                35 +
                Math.floor(
                    Math.random() * 35
                );


            /*
               Update tombol warna
            */

            document
                .querySelectorAll(
                    ".color"
                )
                .forEach(
                    item => {

                        item.classList.toggle(
                            "active",
                            item.dataset
                                .palette ===
                            currentPalette
                        );

                    }
                );


            /*
               Gambar ulang
            */

            resizeCanvas();

        }
    );


/* =====================================================
   DOWNLOAD PNG
===================================================== */

document
    .getElementById(
        "download"
    )
    .addEventListener(
        "click",
        () => {


            const link =
                document.createElement(
                    "a"
                );


            link.download =
                "fraktal-motif-nusantara.png";


            link.href =
                canvas.toDataURL(
                    "image/png"
                );


            link.click();

        }
    );


/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================================
   JALANKAN SAAT WEBSITE DIBUKA
===================================================== */

resizeCanvas();