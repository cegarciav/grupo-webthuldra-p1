function generateMessage(isLiked, likersAmount) {
  let likesMessage = '';
  if (isLiked && likersAmount > 2) likesMessage = `A ti y a otras ${likersAmount - 1} personas les gusta esto`;
  else if (isLiked && likersAmount === 2) likesMessage = 'A ti y a otra persona les gusta esto';
  else if (isLiked && likersAmount === 1) likesMessage = 'Te gusta esto';
  else if (!isLiked && likersAmount > 1) likesMessage = `A ${likersAmount} personas les gusta esto`;
  else if (!isLiked && likersAmount === 1) likesMessage = 'A una persona le gusta esto';

  return likesMessage;
}

module.exports = {
  generateMessage,
};
