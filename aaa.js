if (Meteor.isClient) {
  Template.portfolio.helpers({
    table: function() {
      return {
        options: {
          // Move the display options inside the datatables header after it initialises
          fnInitComplete: function() {
            // $('#portfolio #display-options').detach();
             $('#portfolio-table .datatable-header').prepend( $('#portfolio #display-options').detach() );
          }
        },
        subscription: "holdings",
        id: "portfolio-table",
        columns: [{
            title: "symbol",
            data: "symbol"
          },{
            title: "price",
            data: "price"
          }
        ],
        query: Session.get('portfolioFilter')
      };
    }
  });

  Template.portfolio.events({
    'click #show-closed': function(event, template) {
      var query = Session.get('portfolioFilter');
      if (query && query.shares) {
        delete query.shares;
      } else {
        var filter = { 'shares': { $ne: 0 } };
        _.extend( query, filter );
      }
      Session.set('portfolioFilter', query);
    },
    'click #display-percent': function(event, template) {
      Session.set('displayPercent', true);
    },
    'click #display-amount': function(event, template) {
      Session.set('displayPercent', undefined);
    },
    showClosed: function() {
      var filter = Session.get('portfolioFilter');
      return filter && ! filter.shares;
    }
  });

  Template.portfolio.rendered = function() {
    Session.set('portfolioFilter', { 'shares': { $ne: 0 } });
  };

}

Holdings = new Meteor.Collection('holdings');

if (Meteor.isServer) {
  PortfolioTable = new DataTableComponent({
    subscription: 'holdings',
    collection: Holdings
  });

  PortfolioTable.publish();

  Meteor.startup(function() {
    if (Holdings.find().fetch().length <= 0) {
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
      Holdings.insert({'symbol': 'NAB.AX', 'price': 35.00});
      Holdings.insert({'symbol': 'BHP.AX', 'price': 42.00});
    }
  })
}
