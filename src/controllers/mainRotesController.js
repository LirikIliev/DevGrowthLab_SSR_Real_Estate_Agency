const { sortedPropertiesService, searchPropertyService } = require("../services/houseServices");
const { HOME_PAGE_PROPERTY_SELECTS: select, HOME_PAGE_PROPERTY_SELECTS } = require("./config");

exports.homePageController = async (req, res) => {
  try {
    const { isAuth } = req.cookies;
    const properties = await sortedPropertiesService({ limit: 3, select });
    res.render('pages/home', { pageTitle: 'Home Page', isAuth, properties, error: '' });
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/home",
      pageTitle: 'Home Page',
    };
    next(errObj);
  }
};

exports.getSearchForOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/search', { pageTitle: 'Search For Offer', isAuth, error: '', searchResults: [] });
};

exports.postSearchForOfferController = async (req, res, next) => {
  try {
    const { isAuth } = req.cookies;
    const { search: searchPhrase } = req.body;
    const searchResults = await searchPropertyService({ searchPhrase, selects: HOME_PAGE_PROPERTY_SELECTS });
    console.log(searchResults);

    res.render('pages/search', { pageTitle: 'Search For Offer', isAuth, error: '', searchResults });
  } catch (err) {
    console.log(err)
    next({ errorObject: err })
  }
}

exports.getNotFoundController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/404', { pageTitle: 'Not Found', isAuth, error: '' })
};