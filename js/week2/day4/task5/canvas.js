const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = 800 * dpr;
canvas.height = 400 * dpr;

ctx.scale(dpr, dpr);
const data = [
    { label: "AUG", value: 5500 },
    { label: "SEP", value: 3500 },
    { label: "OCT", value: 8500 },
    { label: "NOV", value: 2500 },
    { label: "DEC", value: 8100 },
    { label: "JAN", value: 6500 },
    { label: "FEB", value: 9500 },
    { label: "MAR", value: 9000 },
    { label: "APR", value: 8000 },
    { label: "MAY", value: 7500 },
    { label: "JUN", value: 2500 },
    { label: "JUL", value: 4500 },
];

let padding = { top: 40, right: 40, bottom: 60, left: 60 };
let chartWidth = 800 - padding.left - padding.right;
let chartHeight = 400 - padding.top - padding.bottom;
let maxValue = Math.max(...data.map((d) => d.value));
let barWidth = (chartWidth / data.length) * 0.8;
let barGap = (chartWidth / data.length) * 0.2;
let valueScale = chartHeight / maxValue;

function drawAxes(ctx) {
    ctx.strokeStyle = `#333`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, 400 - padding.bottom);
    ctx.lineTo(800 - padding.right, 400 - padding.bottom);
    ctx.stroke();
}
function drawLabels(ctx, data) {
    data.forEach((item, index) => {
        const x = padding.left + index * (barWidth + barGap) + barGap / 2;
        const barHeight = item.value * valueScale;
        const y = 400 - padding.bottom - barHeight;

        // draw bar with gradient
        const gradient = ctx.createLinearGradient(
            x,
            y,
            x,
            400 - padding.bottom
        );
        gradient.addColorStop(0, "#4A90E2");
        gradient.addColorStop(1, "#357ABD");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // draw value label on top of bar
        ctx.fillStyle = "#333";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(item.label, x + barWidth / 2, 400 - padding.bottom + 20);
    });
}
function drawGrid(ctx) {
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const value = (maxValue / ySteps) * i;
        const y = 400 - padding.bottom - value * valueScale;

        ctx.fillStyle = "#666";
        ctx.font = "11px Arial";
        ctx.textAlign = "right";
        ctx.fillText(value.toLocaleString(), padding.left - 10, y + 4);

        // draw grid line
        ctx.strokeStyle = "#E0E0E0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(800 - padding.right, y);
        ctx.stroke();
    }
}
function drawBarChart(ctx, data) {
    // clear canvas
    ctx.clearRect(0, 0, 800, 400);

    drawAxes(ctx);
    drawLabels(ctx, data);
    drawGrid(ctx);
}
drawBarChart(ctx, data);
animateBarChart(ctx, data);
function animateBarChart(ctx, data, duration = 1000) {
    const startTime = performance.now();
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuad = (t) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        ctx.clearRect(0, 0, 800, 400);
        // draw static elements (axes, grid)
        drawAxes(ctx);
        data.forEach((item, index) => {
            const x = padding.left + index * (barWidth + barGap) + barGap / 2;
            const finalHeight = item.value * valueScale;
            const currentHeight = finalHeight * easedProgress;
            const y = 400 - padding.bottom - currentHeight;

            const gradient = ctx.createLinearGradient(
                x,
                y,
                x,
                400 - padding.bottom
            );
            gradient.addColorStop(0, "#4A90E2");
            gradient.addColorStop(1, "#357ABD");
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, currentHeight);
        });
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            drawLabels(ctx, data);
            drawGrid(ctx);
        }
    }
    requestAnimationFrame(animate);
}
// implementing interactive features

let hoveredBar = null;
canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let newHoveredBar = null;
    data.forEach((item, index) => {
        const barX = padding.left + index * (barWidth + barGap) + barGap / 2;
        const barHeight = item.value * valueScale;
        const barY = 400 - padding.bottom - barHeight;

        if (
            x >= barX &&
            x <= barX + barWidth &&
            y >= barY &&
            y <= 400 - padding.bottom
        )
            newHoveredBar = index;
    });
    if (newHoveredBar !== hoveredBar) {
        hoveredBar = newHoveredBar;
        redrawChart();
    }
});
function redrawChart() {
    drawBarChart(ctx, data);

    // draw tooltip for hovered bar.
    if (hoveredBar !== null) {
        const item = data[hoveredBar];
        const barX =
            padding.left + hoveredBar * (barWidth + barGap) + barGap / 2;
        const barHeight = item.value * valueScale;
        const barY = 400 - padding.bottom - barHeight;

        const tooltipText = `${item.label}: $${item.value.toLocaleString()}`;
        ctx.font = "14px Arial";
        const textWidth = ctx.measureText(tooltipText).width;
        const tooltipX = barX + barWidth / 2 - textWidth / 2 - 10;
        const tooltipY = barY - 40;

        const fillStyle = "rgba(0,0,0.8)";
        ctx.fillRect(tooltipX, tooltipY, textWidth + 20, 30);

        // tooltip text
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText(tooltipText, barX + barWidth / 2, tooltipY + 20);
    }
}
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const aspectRatio = 2;
    canvas.width = containerWidth * dpr;
    canvas.height = (containerWidth / aspectRatio) * dpr;
    canvas.style.width = containerWidth + "px";
    canvas.style.height = containerWidth / aspectRatio + "px";

    ctx.scale(dpr, dpr);
    chartWidth = containerWidth - padding.left - padding.right;
    chartHeight = containerWidth / aspectRatio - padding.top - padding.bottom;

    drawBarChart(ctx, data);
}
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150);
});
resizeCanvas();

// export chart as png
function exportChart() {
    const imgUrl = canvas.toDataURL("image/png", 1.0);
    const downloadLink = document.createElement("a");
    downloadLink.href = imgUrl;
    downloadLink.download = "monthlySale.png";
    downloadLink.click();
}

document.getElementById("downloadBtn").addEventListener("click", exportChart);
