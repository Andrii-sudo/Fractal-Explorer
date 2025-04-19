const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1170;
canvas.height = 690;

let fractalType = fillMandelbrotPixel;
let kmax = 100;
let initZr = 0;
let initZi = 0;
let constCr = 0;
let constCi = 0;
let bailout = 2;
let form1 = f1;
let form2 = f1;
let pow1 = 1;
let pow2 = 1;

let center = { x: canvas.width  / 2,
                                  y: canvas.height / 2 };

let centerR = 0;
let centerI = 0;
let scale = 1 / (canvas.width / 4);

document.getElementById("btn-draw").addEventListener("click", drawFractal);

document.getElementById("fractal-type").addEventListener("change", fractalTypeChanged);
document.getElementById("maxIter").addEventListener("input", maxIterChanged);
document.getElementById("initZr").addEventListener("input", initZrChanged);
document.getElementById("initZi").addEventListener("input", initZiChanged);
document.getElementById("constCr").addEventListener("input", constCrChanged);
document.getElementById("constCi").addEventListener("input", constCiChanged);
document.getElementById("bailout").addEventListener("input", bailoutChanged);
document.getElementById("formula1").addEventListener("change", formula1Changed);
document.getElementById("formula2").addEventListener("change", formula2Changed);
document.getElementById("pow1").addEventListener("input", pow1Changed);
document.getElementById("pow2").addEventListener("input", pow2Changed);

document.getElementById("maxIter").addEventListener("blur", event =>
{
    if (document.getElementById("maxIter").classList.contains("invalid"))
    {
        kmax = 100;
        document.getElementById("maxIter").value = 100;
        document.getElementById("maxIter").classList.remove("invalid");
    }
});
document.getElementById("initZr").addEventListener("blur", event =>
{
    if (document.getElementById("initZr").classList.contains("invalid"))
    {
        initZr = 0;
        document.getElementById("initZr").value = 0;
        document.getElementById("initZr").classList.remove("invalid");
    }
});
document.getElementById("initZi").addEventListener("blur", event =>
{
    if (document.getElementById("initZi").classList.contains("invalid"))
    {
        initZi = 0;
        document.getElementById("initZi").value = 0;
        document.getElementById("initZi").classList.remove("invalid");
    }
});
document.getElementById("constCr").addEventListener("blur", event =>
{
    if (document.getElementById("constCr").classList.contains("invalid"))
    {
        constCr = 0;
        document.getElementById("constCr").value = 0;
        document.getElementById("constCr").classList.remove("invalid");
    }
});
document.getElementById("constCi").addEventListener("blur", event =>
{
    if (document.getElementById("constCi").classList.contains("invalid"))
    {
        constCi = 0;
        document.getElementById("constCi").value = 0;
        document.getElementById("constCi").classList.remove("invalid");
    }
});
document.getElementById("bailout").addEventListener("blur", event =>
{
    if (document.getElementById("bailout").classList.contains("invalid"))
    {
        bailout = 2;
        document.getElementById("bailout").value = 2;
        document.getElementById("bailout").classList.remove("invalid");
    }
});
document.getElementById("pow1").addEventListener("blur", event =>
{
    if (document.getElementById("pow1").classList.contains("invalid"))
    {
        pow1 = 1;
        document.getElementById("pow1").value = 1;
        document.getElementById("pow1").classList.remove("invalid");
    }
});
document.getElementById("pow2").addEventListener("blur", event =>
{
    if (document.getElementById("pow2").classList.contains("invalid"))
    {
        pow2 = 1;
        document.getElementById("pow2").value = 1;
        document.getElementById("pow2").classList.remove("invalid");
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    const tabs = document.querySelectorAll(".tab");
    const buttons = document.querySelectorAll(".tab-buttons button");

    buttons.forEach((btn, index) =>
    {
        btn.addEventListener('click', () =>
        {
            buttons.forEach(b => b.classList.remove("active"));
            tabs.forEach(t => t.classList.remove("active"));

            btn.classList.add("active");
            tabs[index].classList.add("active");
        });
    });

    buttons[0].click();
    fractalTypeChanged();
});

function fractalTypeChanged()
{
    let strFractalType = document.getElementById("fractal-type").value;
    if (strFractalType === "mandelbrot")
    {
        fractalType = fillMandelbrotPixel;
        document.getElementById("initZ").style.display = "block";
        document.getElementById("initC").style.display = "none";
    }
    else if (strFractalType === "julia")
    {
        fractalType = fillJuliaPixel;
        document.getElementById("initZ").style.display = "none";
        document.getElementById("initC").style.display = "block";
    }
    //else if (fractalType === "burning-ship") { }
}

function maxIterChanged()
{
    let num = parseInt(document.getElementById("maxIter").value);
    if (num)
    {
        if (num > 5000)
        {
            document.getElementById("maxIter").value = 5000;
            kmax = 5000;
        }
        else if (num < 0)
        {
            document.getElementById("maxIter").value = 0;
            kmax = 0;
        }
        else
        {
            document.getElementById("maxIter").value = num;
            kmax = num;
        }

        document.getElementById("maxIter").classList.remove("invalid");
    }
    else
    {
        document.getElementById("maxIter").classList.add("invalid");
    }
}

function initZrChanged()
{
    if (!isNaN(parseFloat(document.getElementById("initZr").value)))
    {
        initZr = parseFloat(document.getElementById("initZr").value);

        document.getElementById("initZr").classList.remove("invalid");
    }
    else
    {
        document.getElementById("initZr").classList.add("invalid");
    }
}

function initZiChanged()
{
    if (!isNaN(parseFloat(document.getElementById("initZi").value)))
    {
        initZi = parseFloat(document.getElementById("initZi").value);

        document.getElementById("initZi").classList.remove("invalid");
    }
    else
    {
        document.getElementById("initZi").classList.add("invalid");
    }
}

function constCrChanged()
{
    if (!isNaN(parseFloat(document.getElementById("constCr").value)))
    {
        constCr = parseFloat(document.getElementById("constCr").value);

        document.getElementById("constCr").classList.remove("invalid");
    }
    else
    {
        document.getElementById("constCr").classList.add("invalid");
    }
}

function constCiChanged()
{
    if (!isNaN(parseFloat(document.getElementById("constCi").value)))
    {
        constCi = parseFloat(document.getElementById("constCi").value);

        document.getElementById("constCi").classList.remove("invalid");
    }
    else
    {
        document.getElementById("constCi").classList.add("invalid");
    }
}

function bailoutChanged()
{
    let num = parseFloat(document.getElementById("bailout").value)
    if (!isNaN(num))
    {
        if (num < 0.1)
        {
            bailout = 0.1;
            document.getElementById("bailout").value = 0.1;
        }
        else if (num > 5000)
        {
            bailout = 5000;
            document.getElementById("bailout").value = 5000;
        }
        else
        {
            bailout = num;
            document.getElementById("bailout").value = num;
        }

        document.getElementById("bailout").classList.remove("invalid");
    }
    else
    {
        document.getElementById("bailout").classList.add("invalid");
    }
}

function formula1Changed()
{
    let strForm1 = document.getElementById("formula1").value;

    switch (strForm1)
    {
        case "1":
            form1 = f1;
            break;
        case "z":
            form1 = z;
            break;
        case "sinz":
            form1 = SinZ;
            break;
        case "cosz":
            form1 = CosZ;
            break;
        case "tgz":
            form1 = TgZ;
            break;
        case "ctgz":
            form1 = CtgZ;
            break;
        case "shz":
            form1 = ShZ;
            break;
        case "chz":
            form1 = ChZ;
            break;
    }
}

function formula2Changed()
{
    let strForm2 = document.getElementById("formula2").value;

    switch (strForm2)
    {
        case "1":
            form2 = f1;
            break;
        case "z":
            form2 = z;
            break;
        case "sinz":
            form2 = SinZ;
            break;
        case "cosz":
            form2 = CosZ;
            break;
        case "tgz":
            form2 = TgZ;
            break;
        case "ctgz":
            form2 = CtgZ;
            break;
        case "shz":
            form2 = ShZ;
            break;
        case "chz":
            form2 = ChZ;
            break;
    }
}

function pow1Changed()
{
    let num = parseFloat(document.getElementById("pow1").value);
    if (!isNaN(num))
    {
        if (num < -20)
        {
            pow1 = -20;
            document.getElementById("pow1").value = -20;
        }
        else if (num > 20)
        {
            pow1 = 20;
            document.getElementById("pow1").value = 20;
        }
        else
        {
            pow1 = num;
            document.getElementById("pow1").value = num;
        }

        document.getElementById("pow1").classList.remove("invalid");
    }
    else
    {
        document.getElementById("pow1").classList.add("invalid");
    }
}

function pow2Changed()
{
    let num = parseFloat(document.getElementById("pow2").value);
    if (!isNaN(num))
    {
        if (num < -20)
        {
            pow2 = -20;
            document.getElementById("pow2").value = -20;
        }
        else if (num > 20)
        {
            pow2 = 20;
            document.getElementById("pow2").value = 20;
        }
        else
        {
            pow2 = num;
            document.getElementById("pow2").value = num;
        }

        document.getElementById("pow2").classList.remove("invalid");
    }
    else
    {
        document.getElementById("pow2").classList.add("invalid");
    }
}

function drawFractal()
{
    let i = 0;
    let frame = new ImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++)
    {
        for (let x = 0; x < canvas.width; x++)
        {
            const color = fractalType(x, y);
            let [r, g, b] = hexToRGB(color);
            frame.data[i++] = r;
            frame.data[i++] = g;
            frame.data[i++] = b;
            frame.data[i++] = 255;
        }
    }
    ctx.putImageData(frame, 0, 0);
}

function hexToRGB(color)
{
    if (color === "black")
    {
        return [0, 0, 0];
    }
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return [r, g, b];
}

function canvasToComplex(x, y)
{
    let r = centerR +  (x - center.x) * scale;
    let i = centerI + -(y - center.y) * scale;
    return [r, i];
}

function fillPixel(x, y, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
}

function fillMandelbrotPixel(x, y)
{
    let [cr, ci] = canvasToComplex(x, y);
    let [zr, zi] = [initZr, initZi];

    for (let k = 0; k < kmax; k++)
    {
        let [nextZr1, nextZi1] = form1(zr, zi);
        let [nextZr2, nextZi2] = form2(zr, zi);

        [nextZr1, nextZi1] = pow1 ? complexPow(nextZr1, nextZi1, pow1) : [nextZr1, nextZi1];
        [nextZr2, nextZi2] = pow2 ? complexPow(nextZr2, nextZi2, pow2) : [nextZr2, nextZi2];

        let [nextZr, nextZi] = complexMul(nextZr1, nextZi1, nextZr2, nextZi2);

        zr = nextZr + cr;
        zi = nextZi + ci;

        if (zr * zr + zi * zi > bailout * bailout)
        {
            return colors[k % colors.length];
        }
    }
    return "black";
}
function fillJuliaPixel(x, y)
{
    let [zr, zi] = canvasToComplex(x, y);

    for (let k = 0; k < kmax; k++)
    {
        let [nextZr1, nextZi1] = form1(zr, zi);
        let [nextZr2, nextZi2] = form2(zr, zi);

        [nextZr1, nextZi1] = pow1 ? complexPow(nextZr1, nextZi1, pow1) : [nextZr1, nextZi1];
        [nextZr2, nextZi2] = pow2 ? complexPow(nextZr2, nextZi2, pow2) : [nextZr2, nextZi2];

        let [nextZr, nextZi] = complexMul(nextZr1, nextZi1, nextZr2, nextZi2);

        zr = nextZr + constCr;
        zi = nextZi + constCi;

        if (zr * zr + zi * zi > bailout * bailout)
        {
            return colors[k % colors.length];
        }
    }
    return "black";
}

//

function complexPow(re, im, power)
{
    const r     = Math.sqrt(re * re + im * im);
    const theta = Math.atan2(im, re);

    const rPowered = Math.pow(r, power);
    const angle    = theta * power;

    const newRe = rPowered * Math.cos(angle);
    const newIm = rPowered * Math.sin(angle);

    return [newRe, newIm];
}

function complexMul(zr1, zi1, zr2, zi2)
{
    const zr = zr1 * zr2 - zi1 * zi2;
    const zi = zr1 * zi2 + zi1 * zr2;
    return [zr, zi];
}

function f1(zr, zi)
{
    return [1, 0];
}

function z(zr, zi)
{
    return [zr, zi];
}

function SinZ(zr, zi)
{
    let newZr = Math.sin(zr) * Math.cosh(zi);
    let newZi = Math.cos(zr) * Math.sinh(zi);

    return [newZr, newZi];
}

function CosZ(zr, zi)
{
    let newZr =  Math.cos(zr) * Math.cosh(zi);
    let newZi = -Math.sin(zr) * Math.sinh(zi);

    return [newZr, newZi];
}

function TgZ(zr, zi)
{
    let denom = Math.cos(2 * zr) + Math.cosh(2 * zi);
    let newZr = Math.sin(2 * zr)  / denom;
    let newZi = Math.sinh(2 * zi) / denom;

    return [newZr, newZi];
}

function CtgZ(zr, zi)
{
    let [sr, si] = SinZ(zr, zi); // sin(z)
    let [cr, ci] = CosZ(zr, zi); // cos(z)

    let denom = sr * sr + si * si;

    if (denom === 0) {
        return [NaN, NaN]; // уникнення ділення на нуль
    }

    let newZr = (cr * sr + ci * si) / denom;
    let newZi = (ci * sr - cr * si) / denom;

    return [newZr, newZi];
}

function ShZ(zr, zi)
{
    let newZr = Math.sinh(zr) * Math.cos(zi);
    let newZi = Math.cosh(zr) * Math.sin(zi);

    return [newZr, newZi];
}

function ChZ(zr, zi)
{
    let newZr = Math.cosh(zr) * Math.cos(zi);
    let newZi = Math.sinh(zr) * Math.sin(zi);

    return [newZr, newZi];
}


const colors =
[
    "#000049", "#000555", "#000C66", "#002577", "#003A8C", "#004F9E", "#0063B2",
    "#0077C4", "#0091D8", "#00A4DD", "#00B8E6", "#30C6EC", "#60D2F4", "#80D8F5",
    "#9BD2F5", "#B8DADB", "#D7E3DE", "#F4EBA5", "#FFEDAF", "#FFE57A", "#FFDE64",
    "#FFD433", "#FFC300", "#F8B200", "#F0AA00", "#E19900", "#DC8C00", "#C87500",
    "#B45500"
];
