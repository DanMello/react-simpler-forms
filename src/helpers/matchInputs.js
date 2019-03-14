
export default function allmatch (data) {

  let matchingGroups = Object.keys(data)
    .filter(input => data[input].match)
    .reduce((result, item) => ({
      ...result,
      [data[item].match]: [
        ...(result[data[item].match] || []),
        data[item]
      ]
    }), {})

  return Object.keys(matchingGroups)
    .map(a => matchingGroups[a].every(b => matchingGroups[a][0].value === b.value))
    .every(item => !!item)
}