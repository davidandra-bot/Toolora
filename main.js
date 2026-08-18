// ============ TOOLORA - MAIN JAVASCRIPT ============

// Tool Data
const toolsData = [
    { id: 'pdf-merge', name: 'PDF Merge', icon: '📄', category: 'File Tools', desc: 'Combine multiple PDFs into one file', badge: 'File Tool', href: 'tools/pdf-merge.html' },
    { id: 'pdf-split', name: 'PDF Split', icon: '✂️', category: 'File Tools', desc: 'Split PDF into separate pages', badge: 'File Tool', href: 'tools/pdf-split.html' },
    { id: 'pdf-compress', name: 'PDF Compress', icon: '📦', category: 'File Tools', desc: 'Reduce PDF file size', badge: 'File Tool', href: 'tools/pdf-compress.html' },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', icon: '🖼️', category: 'File Tools', desc: 'Convert PDF pages to images', badge: 'File Tool', href: 'tools/pdf-to-jpg.html' },
    { id: 'image-compress', name: 'Image Compress', icon: '🗜️', category: 'Image Tools', desc: 'Reduce image file size', badge: 'Image Tool', href: 'tools/image-compress.html' },
    { id: 'image-resize', name: 'Image Resize', icon: '📐', category: 'Image Tools', desc: 'Resize images to exact dimensions', badge: 'Image Tool', href: 'tools/image-resize.html' },
    { id: 'image-converter', name: 'Image Converter', icon: '🔄', category: 'Image Tools', desc: 'Convert between image formats', badge: 'Image Tool', href: 'tools/image-converter.html' },
    { id: 'background-remover', name: 'Background Remover', icon: '🎯', category: 'Image Tools', desc: 'Remove image backgrounds', badge: 'Image Tool', href: 'tools/background-remover.html' },
    { id: 'word-counter', name: 'Word Counter', icon: '📝', category: 'Text & AI', desc: 'Count words, characters, sentences', badge: 'Text Tool', href: 'tools/word-counter.html' },
    { id: 'case-converter', name: 'Case Converter', icon: '🔤', category: 'Text & AI', desc: 'Convert text between cases', badge: 'Text Tool', href: 'tools/case-converter.html' },
    { id: 'text-rewriter', name: 'AI Text Rewriter', icon: '🤖', category: 'Text & AI', desc: 'Rewrite text with AI', badge: 'AI Tool', href: 'tools/text-rewriter.html' },
    { id: 'text-summarizer', name: 'AI Summarizer', icon: '📋', category: 'Text & AI', desc: 'Summarize long texts', badge: 'AI Tool', href: 'tools/text-summarizer.html' },
    { id: 'password-generator', name: 'Password Generator', icon: '🔐', category: 'Generators', desc: 'Generate secure passwords', badge: 'Generator', href: 'tools/password-generator.html' },
    { id: 'qr-code', name: 'QR Code Generator', icon: '📱', category: 'Generators', desc: 'Create QR codes for any content', badge: 'Generator', href: 'tools/qr-code-generator.html' },
    { id: 'color-palette', name: 'Color Palette', icon: '🎨', category: 'Generators', desc: 'Generate harmonious color schemes', badge: 'Generator', href: 'tools/color-palette.html' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: '📄', category: 'Generators', desc: 'Generate placeholder text', badge: 'Generator', href: 'tools/lorem-ipsum.html' },
    { id: 'percentage-calculator', name: 'Percentage Calculator', icon: '💯', category: 'Calculators', desc: 'Calculate percentages easily', badge: 'Calculator', href: 'tools/percentage-calculator.html' },
    { id: 'bmi-calculator', name: 'BMI Calculator', icon: '⚖️', category: 'Calculators', desc: 'Calculate Body Mass Index', badge: 'Calculator', href: 'tools/bmi-calculator.html' },
    { id: 'unit-converter', name: 'Unit Converter', icon: '📏', category: 'Calculators', desc: 'Convert between units', badge: 'Calculator', href: 'tools/unit-converter.html' },
    { id: 'age-calculator', name: 'Age Calculator', icon: '🎂', category: 'Calculators', desc: 'Calculate your exact age', badge: 'Calculator', href: 'tools/age-calculator.html' },
];

const categoriesData = [
    { name: 'File Tools', icon: '📄', count: 4, desc: 'PDF processing tools' },
    { name: 'Image Tools', icon: '🖼️', count: 4, desc: 'Edit and optimize images' },
    { name: 'Text & AI', icon: '🤖', count: 4, desc: 'Text and AI tools' },
    { name: 'Generators', icon: '⚡', count: 4, desc: 'Create content instantly' },
    { name: 'Calculators', icon: '🧮', count: 4, desc: 'Quick calculations' },
];

// ============ THEME ============
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

// ============ RENDER TOOLS ============
function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        const popular = toolsData.slice(0, 8);
        grid.innerHTML = popular.map(tool => createToolCard(tool)).join('');
    }
    
    const allGrid = document.getElementById('allToolsGrid');
    if (allGrid) {
        allGrid.innerHTML = toolsData.map(tool => createToolCard(tool)).join('');
    }
    
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categoriesData.map(cat => `
            <div class="category-card" onclick="filterByCategory('${cat.name}')">
                <div class="category-icon">${cat.icon}</div>
                <h3>${cat.name}</h3>
                <p>${cat.desc} (${cat.count} tools)</p>
            </div>
        `).join('');
    }
    
    loadRecentTools();
}

function createToolCard(tool) {
    return `
        <a href="${tool.href}" class="tool-card">
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
            <span class="tool-badge">${tool.badge}</span>
        </a>
    `;
}

// ============ SEARCH ============
function searchTools() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        const filtered = toolsData.filter(t => 
            t.name.toLowerCase().includes(query) || 
            t.desc.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query)
        );
        grid.innerHTML = filtered.map(tool => createToolCard(tool)).join('');
    }
}

// ============ FILTER ============
function filterByCategory(category) {
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        const filtered = toolsData.filter(t => t.category === category);
        grid.innerHTML = filtered.map(tool => createToolCard(tool)).join('');
        grid.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============ RECENT TOOLS ============
function trackRecentTool(toolId, toolName, toolHref, toolIcon) {
    let recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
    recent = recent.filter(t => t.id !== toolId);
    recent.unshift({ id: toolId, name: toolName, href: toolHref, icon: toolIcon });
    recent = recent.slice(0, 6);
    localStorage.setItem('recentTools', JSON.stringify(recent));
}

function loadRecentTools() {
    const recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
    const recentGrid = document.getElementById('recentGrid');
    const recentSection = document.getElementById('recentSection');
    
    if (recentGrid && recent.length > 0) {
        if (recentSection) recentSection.style.display = 'block';
        recentGrid.innerHTML = recent.map(tool => `
            <a href="${tool.href}" class="tool-card">
                <div class="tool-icon">${tool.icon}</div>
                <h3>${tool.name}</h3>
                <p>Recently used</p>
            </a>
        `).join('');
    }
}

// ============ STICKY AD ============
function closeStickyAd() {
    const stickyAd = document.getElementById('stickyAd');
    if (stickyAd) {
        stickyAd.style.display = 'none';
    }
}

// ============ TOAST ============
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'toastContainer';
        document.body.appendChild(div);
    }
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 16px 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.12);
        z-index: 9999;
        max-width: 350px;
        border-left: 4px solid ${type === 'error' ? '#EF4444' : '#10B981'};
        animation: slideIn 0.3s ease;
    `;
    toast.innerHTML = `<strong>${type === 'error' ? '⚠️' : '✅'}</strong> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    renderTools();
});
