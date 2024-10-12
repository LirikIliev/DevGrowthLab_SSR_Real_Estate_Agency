const { sortedPropertiesService, searchPropertyService } = require("../services/houseServices");
const { HOME_PAGE_PROPERTY_SELECTS: select, HOME_PAGE_PROPERTY_SELECTS } = require("./config");

exports.homePageController = async (req, res) => {
  try {
    const { isAuth } = req.cookies;
    const properties = await sortedPropertiesService({ limit: 3, select });
    const path = req.path
    res.render('pages/home', { pageTitle: 'Home Page', isAuth, path, properties, error: '' });
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
  const path = req.path;
  res.render('pages/search', { pageTitle: 'Search For Offer', isAuth, path, error: '', searchResults: [] });
};

exports.postSearchForOfferController = async (req, res, next) => {
  try {
    const { isAuth } = req.cookies;
    const path = req.path;
    const { search: searchPhrase } = req.body;
    const searchResults = await searchPropertyService(
      {
        searchPhrase,
        selects: HOME_PAGE_PROPERTY_SELECTS
      });

    res.render('pages/search', {
      pageTitle: 'Search For Offer',
      isAuth,
      path,
      error: '',
      searchResults
    });
  } catch (err) {
    console.error(err)
    next({ errorObject: err })
  }
}

exports.getNotFoundController = (req, res) => {
  const { isAuth } = req.cookies;
  path = req.path;
  res.render('pages/404',
    {
      pageTitle: 'Not Found',
      isAuth,
      path,
      error: ''
    })
};