const AWS = require('aws-sdk');
const S3_API = new AWS.S3({ apiVersion: '2006-03-01' });
const BUCKET_NAME_STR = 'fajjarnr-report';

exports.handler = async (event) => {
  await writeReport(await createHTML(event));

  const response = {
    message: 'Report published to S3',
  };

  return response;
};

async function createHTML(event) {
  let item = event.Items;
  let html_str = '';
  let o = {};

  html_str += '<!DOCTYPE html>';
  html_str += '<html lang="en">';

  html_str += '<head>';
  html_str += '<meta charset="utf-8" />';
  html_str +=
    '<meta name="viewport" content="width=device-width, initial-scale=1" />';
  html_str += '<title>Report Penjualan</title>';
  html_str +=
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />';
  html_str += '</head>';

  html_str += '<body>';

  html_str += '<div class="container py-5">';
  html_str += '<h2 class="text-center">Report Penjualan</h2>';
  html_str += '<table class="table table-striped">';
  html_str += '<thead>';
  html_str += '<tr>';
  html_str += '<th scope="col">id</th>';
  html_str += '<th scope="col">Name</th>';
  html_str += '<th scope="col">Price</th>';
  html_str += '<th scope="col">Sales</th>';
  html_str += '<th scope="col">rating</th>';
  html_str += '</tr>';
  html_str += '</thead>';
  html_str += '<tbody>';

  for (let i = 0; i < item.length; i += 1) {
    o = item[i];

    html_str += '<tr>';
    html_str += `<td>${o.id}</td>`;
    html_str += `<td>${o.name}</td>`;
    html_str += `<td>${o.price}</td>`;
    html_str += `<td>${o.sales}</td>`;
    html_str += `<td>${o.rating}</td>`;
    html_str += '</tr>';
  }

  html_str += '</tbody>';
  html_str += '</table>';
  html_str += '</div>';

  html_str +=
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>';
  html_str += '</body>';

  html_str += '</html>';

  return html_str;
}

async function writeReport(html_str) {
  let params = {
    Bucket: BUCKET_NAME_STR,
    Key: 'report.html',
    Body: html_str,
    CacheControl: 'max-age=0',
    ContentType: 'text/html',
  };

  await S3_API.upload(params).promise();
}
