export const prepareFileUrl = ({ id, file, baseUrl }) => {
  baseUrl = baseUrl.replace(':id', id);
  baseUrl = baseUrl.replace(':name', file.name);
  baseUrl = baseUrl.replace(':type', file.type);
  return baseUrl;
};
export const prepareSearchUrl = ({ term, limit, offset, baseUrl }) => {
  baseUrl = baseUrl.replace(':term', term);
  baseUrl = baseUrl.replace(':limit', limit);
  baseUrl = baseUrl.replace(':offset', offset);
  return baseUrl;
};
