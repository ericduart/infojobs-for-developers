import { INFOJOBS_TOKEN } from '@/app/components/config.js'

const headers = {
  Authorization: `Basic ${INFOJOBS_TOKEN}`
}

async function getOfferById (offerId) {
  const resOffer = await fetch(`https://api.infojobs.net/api/9/offer/${offerId}`, { headers, next: { revalidate: 60 } })

  return await resOffer.json()
}

async function getSkillsByArrOfIds (arrOffersIds) {
  const arrSkills = []

  for (let i = 0; i < arrOffersIds.length; i++) {
    const offerId = arrOffersIds[i]

    const resOffer = await fetch(`https://api.infojobs.net/api/9/offer/${offerId}`, { headers, next: { revalidate: 60 } })
    const dataOffer = await resOffer.json()

    arrSkills.push({
      offerId,
      skills: dataOffer.skillsList.map(skillObj => skillObj.skill)
    })
  }

  return arrSkills
}

async function getOffersWithSkills (province = false, page = 1) {
  const arrOffers = { pagePosition: page, offers: [], skills: [] }

  const resOffers = await fetch(`https://api.infojobs.net/api/9/offer?subcategory=programacion${province ? `&province=${province}` : ''}&page=${page}`, { headers, next: { revalidate: 60 } })

  const dataOffers = await resOffers.json()

  const { currentPage, totalPages } = dataOffers

  if (currentPage > totalPages) return { ...arrOffers, totalPages }

  arrOffers.offers.push(
    ...dataOffers.offers.map(offer => {
      const { id, title, link } = offer
      return { id, title, link }
    })
  )

  const skills = await getSkillsByArrOfIds(dataOffers.offers.map(offer => offer.id))

  arrOffers.skills.push(...skills)

  return { ...arrOffers, totalPages }
}

async function getProvincesOfOffers () {
  const res = await fetch('https://api.infojobs.net/api/1/dictionary/province', { headers, next: { revalidate: 60 } })

  const provinces = await res.json()

  return provinces.filter(province => province.key !== 'seleccionar')
}

async function getExperienceMin () {
  const res = await fetch('https://api.infojobs.net/api/1/dictionary/experience-min', { headers, next: { revalidate: 60 } })

  return await res.json()
}

async function getOffersBySkillAndProvince (userSkill, provinceData, hardSearch) {
  const arrOffers = { offers: [], skills: [] }
  if (!userSkill && !provinceData) return { arrOffers, content: false }

  const { id, key } = JSON.parse(provinceData)

  const useProvince = id !== null && key !== null

  const loop = hardSearch ? 5 : 2

  for (let i = 1; i <= loop; i++) {
    const res = await fetch(`https://api.infojobs.net/api/9/offer?subcategory=programacion&page=${i}${useProvince ? `&province=${key}` : ''}&maxResults=50`, { headers, next: { revalidate: 60 } })

    const offersData = await res.json()
    let { offers, totalPages, currentPage } = offersData

    if (currentPage > totalPages) return { arrOffers, content: arrOffers.offers.length !== 0 }

    if (useProvince) offers = offers.filter(offer => offer.province.id === id)

    let skillsOfOffers = await getSkillsByArrOfIds(offers.map(offer => offer.id))

    if (userSkill) {
      skillsOfOffers = skillsOfOffers.filter(offer => offer.skills.some(skill => skill.toLowerCase() === userSkill.toLowerCase()))

      offers = offers.filter(offer => typeof skillsOfOffers.find(skill => skill.offerId === offer.id) !== 'undefined')
    }

    arrOffers.offers = [...arrOffers.offers, ...offers]
    arrOffers.skills = [...arrOffers.skills, ...skillsOfOffers]
  }

  return { arrOffers, content: arrOffers.offers.length !== 0 }
}

async function getTopNewestOffers (totalPages) {
  const arrOffers = { offers: [], skills: [] }

  for (let i = 1; i <= totalPages; i++) {
    const res = await fetch(`https://api.infojobs.net/api/9/offer?subcategory=programacion&page=${i}&maxResults=50`, { headers, next: { revalidate: 60 } })
    const offersRes = await res.json()
    const offersSkills = await getSkillsByArrOfIds(offersRes.offers.map(offer => offer.id))

    arrOffers.offers.push(...offersRes.offers)
    arrOffers.skills.push(...offersSkills)
  }

  return arrOffers
}

export {
  getOffersWithSkills,
  getOfferById,
  getProvincesOfOffers,
  getOffersBySkillAndProvince,
  getTopNewestOffers,
  getExperienceMin
}
