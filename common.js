function capitalize(text) {
  return text.includes('-')
    ? text
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : text.charAt(0).toUpperCase() + text.slice(1);
}

export { capitalize };
