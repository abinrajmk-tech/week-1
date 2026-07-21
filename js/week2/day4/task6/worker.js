onmessage = (e) => {
    const data = e.data;
    postMessage(data.sort((a, b) => a - b));
};
