import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
import json

data = pd.read_csv('data.csv')
x = data['x']
y = data['y']

parsed = json.loads(data.to_json(orient="values"))

print(json.dumps(parsed, indent=4))

res = stats.linregress(x, y)

plt.plot(x, y, '.', label='original data')
plt.plot(x, res.intercept + res.slope*x, 'r', label='fitted line')
plt.legend()
plt.show()

# x = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
# # y = 1 * x_0 + 2 * x_1 + 3
# y = np.dot(x, np.array([1, 2])) + 3
# reg = LinearRegression().fit(x, y)
# print(reg.score(x, y))
# print(reg.coef_)
# print(reg.intercept_)
# print(reg.predict(np.array([[3, 5]])))