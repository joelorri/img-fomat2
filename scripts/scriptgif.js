document.addEventListener("DOMContentLoaded", () => {
    const imageInfo = [
        { type: "GIF original", src: "/dejavu/deja-vu.gif" },
        { type: "WebP", src: "/dejavu/deja-vu.webp" },
        { type: "AVIF", src: "/dejavu/deja-vu-ezgif.com-gif-to-avif-converter.avif" }
    ];

    const resultsTable = document.createElement("table");
    resultsTable.className = "mx-auto mt-10 border-collapse border border-gray-300";

    resultsTable.innerHTML = `
        <thead>
            <tr>
                <th class="border border-gray-300 p-2">Format</th>
                <th class="border border-gray-300 p-2">Mida (KB)</th>
                <th class="border border-gray-300 p-2">Estalvi respecte GIF (%)</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = resultsTable.querySelector("tbody");
    document.body.appendChild(resultsTable);

    // Obtenim la mida de cada imatge
    imageInfo.forEach((image, index) => {
        fetch(image.src)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error carregant ${image.src}`);
                }
                return response.blob();
            })
            .then(blob => {
                const sizeKB = (blob.size / 1024).toFixed(2);
                image.size = sizeKB;

                if (index === 0) {
                    image.originalSize = sizeKB; // Guardem la mida del GIF original
                }

                const savings =
                    index === 0
                        ? "N/A"
                        : (((imageInfo[0].size - sizeKB) / imageInfo[0].size) * 100).toFixed(2);

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="border border-gray-300 p-2">${image.type}</td>
                    <td class="border border-gray-300 p-2">${sizeKB}</td>
                    <td class="border border-gray-300 p-2">${savings}</td>
                `;
                tbody.appendChild(row);
            })
            .catch(error => {
                console.error(`No s'ha pogut carregar la imatge ${image.src}`, error);
            });
    });
});
