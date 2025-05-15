Middlewares => What is middlewares and how ExpressJS uses it?

## Pagination :

/feed?page=1&limit=10 => First 10 users ( 1 - 10 ) .skip(0) .limit(10)
/feed?page=2&limit=10 => Next 10 users ( 11 - 20 )  .skip(10) .limit(10)

In MongoDB : Skip and Limit functions
.skip()
.limit()
