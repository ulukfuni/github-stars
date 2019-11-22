import React, { useState } from 'react'
import Card from './Card'
import Flex from './Flex'

/**
 * get the commits based on repo and owner since yesterday param
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} yesterday ISO 8601 string
 * @return {array} data [ commit ] 
 */
const getCommit = async (owner, repo, yesterday) => {
	try {
		const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${yesterday}`)
		const data = await res.json()
		return data
	} catch (e) {
		return false
	}
}

export default props => {
	const { repo, yesterday } = props
	const [ commit, setCommit ] = useState([])
	const [ clicked, setClicked ] = useState(false)

	/**
	 * on click of card, get and set commit data and click status
	 * @param {string} owner 
	 * @param {string} name 
	 * @param {string} yesterday 
	 */
	const clickCard = async (owner, name, yesterday) => {
		const commitData = await getCommit(owner, name, yesterday)
		setCommit(commitData)
		setClicked(true)
	}

	return (
		<Card width="30%" m="5px" p="7px" cursor={clicked ? 'initial' : 'pointer'} onClick={() => (clicked ? null : clickCard(repo.owner.login, repo.name, yesterday))}>
			<Flex justifyContent="space-between">
				<p>{repo.name}</p>
				<p>{repo.stargazers_count} Stars</p>
			</Flex>
			<p>{repo.html_url}</p>
			{commit && commit.length > 0 && (
				<>
					<hr/>
					<div style={{ height: '200px', overflow: 'scroll'}}>
						{commit.map(c => {
							return (
								<Card key={c.commit.author.date} m="3px" p="3px">
									<p>{c.commit.author.name}</p>
									<p>{c.commit.author.date}</p>
									<p>{c.commit.message}</p>
								</Card>
							)
						})}
					</div>
				</>
			)}
			{clicked && commit.length === 0 && (
				<div>No Commits within the last 24 hours</div>
			)}
			{clicked && (commit.message || commit === false) && (
				<div>Welp, GitHub API is not doing too well...</div>
			)}
		</Card>
	)
}