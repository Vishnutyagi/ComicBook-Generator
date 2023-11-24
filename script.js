document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comicForm');
    const comicDisplay = document.getElementById('comicDisplay');
    const errorMessage = document.getElementById('errorMessage');

    async function query(data) {
        try {
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: { 
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.blob();
            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';
        const panels = [];
    
        for (let i = 1; i <= 10; i++) {
            const panelText = document.getElementById(`panel${i}`).value;
            panels.push(panelText);
        }
    
        try {
            const newWindow = window.open('comic.html', '_blank');
            newWindow.onload = async () => {
                const comicDisplay = newWindow.document.getElementById('comicDisplay');     
                for (let i = 0; i < panels.length; i++) {
                    const imageData = await query({ "inputs": panels[i] });
                    const img = newWindow.document.createElement('img');
                    img.src = URL.createObjectURL(imageData);
                    img.classList.add('comic-image');
                    const container = newWindow.document.createElement('div');
                    container.classList.add('image-container');
                    container.appendChild(img);
                    const bubbleText = newWindow.document.createElement('p');
                    bubbleText.classList.add('bubble-text');
                    bubbleText.textContent = panels[i]; 
                    container.appendChild(bubbleText);
                    comicDisplay.appendChild(container);
                    
                }
            };
        } catch (error) {
            errorMessage.textContent = 'Failed to generate comic. Please try again.';
        }
    });
    
});
