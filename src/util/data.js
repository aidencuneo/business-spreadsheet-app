export function saveCategories(categories) {
    localStorage.setItem('business_spreadsheet_categories', JSON.stringify(categories));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem('business_spreadsheet_categories') ?? '[]');
}
